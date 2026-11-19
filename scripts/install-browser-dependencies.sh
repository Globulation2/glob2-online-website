#!/usr/bin/env bash
set -euo pipefail

configure_ubuntu_mirrors() {
  sudo python3 - "$1" "$2" <<'PY'
from pathlib import Path
import re
import sys

archive, security = sys.argv[1:]
sources = Path('/etc/apt/sources.list.d/ubuntu.sources')
text = sources.read_text()
# Change transport/host only; retain suites, components and Signed-By verbatim.
text = re.sub(
    r'https?://(azure\.archive|archive|security)\.ubuntu\.com/ubuntu/?(?=\s|$)',
    lambda match: security if match[1] == 'security' else archive,
    text,
)
sources.write_text(text)
for name, mirror in [('apt-mirrors.txt', archive), ('apt-mirrors-security.txt', security)]:
    path = Path('/etc/apt') / name
    if path.exists():
        path.write_text(mirror + '\n')
Path('/etc/apt/apt.conf.d/80-browser-downloads').write_text(
    'Acquire::Retries "2";\n'
    'Acquire::http::Timeout "30";\n'
    'Acquire::https::Timeout "30";\n'
    'APT::Update::Error-Mode "any";\n'
)
PY
}

install_browser_dependencies() {
  local node_binary cli status=1 attempt
  node_binary="$(command -v node)"
  cli="$(pwd)/node_modules/playwright/cli.js"
  for attempt in 1 2; do
    if [[ "$attempt" == 1 ]]; then
      configure_ubuntu_mirrors https://archive.ubuntu.com/ubuntu https://security.ubuntu.com/ubuntu || return $?
    else
      # A timed-out package transaction may need configuration before retrying.
      # Stop if recovery fails; do not bypass package/signature errors.
      sudo timeout --kill-after=10s 30s dpkg --configure -a || return $?
      configure_ubuntu_mirrors https://azure.archive.ubuntu.com/ubuntu https://azure.archive.ubuntu.com/ubuntu || return $?
    fi
    echo "Installing browser OS dependencies: attempt $attempt of 2"
    # The timeout itself runs as root so it can terminate elevated apt/dpkg
    # descendants. Browser binaries are installed separately by the runner user.
    if sudo timeout --kill-after=10s 180s "$node_binary" "$cli" install-deps chromium firefox webkit; then
      return 0
    else
      status=$?
      echo "Browser OS dependency attempt $attempt failed (exit $status)." >&2
    fi
  done
  return "$status"
}

if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
  install_browser_dependencies
fi
