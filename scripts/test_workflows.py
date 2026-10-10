"""Superseded CI runs are cancelled; deployment and publishing runs are not.

Workflows are read textually; only the top-level `on:` and `concurrency:` blocks matter.
"""
from pathlib import Path
import re
import unittest

WORKFLOWS = Path(__file__).resolve().parents[1] / '.github/workflows'
STANDARD_CANCEL = ("${{ github.event_name == 'pull_request' || (github.event_name == 'push' && "
                   "startsWith(github.ref, 'refs/heads/') && "
                   "github.ref != format('refs/heads/{0}', github.event.repository.default_branch)) }}")
# Scheduled publishing, monitoring and manual operations: never cancelled in progress.
OPERATIONS = {'monitor.yml', 'rankings.yml', 'releases.yml', 'rollback.yml', 'guide-media.yml'}


def block(text, key):
    match = re.search(rf'^{key}:\n((?:[ #].*\n|\n)*)', text, re.M)
    return match.group(1) if match else None


class WorkflowConcurrencyTest(unittest.TestCase):
    def workflows(self):
        return {path.name: path.read_text() for path in sorted(WORKFLOWS.glob('*.y*ml'))}

    def test_operations_are_classified(self):
        self.assertFalse(OPERATIONS - set(self.workflows()))

    def test_ci_workflows_cancel_superseded_runs(self):
        for name, text in self.workflows().items():
            if name in OPERATIONS:
                continue
            with self.subTest(workflow=name):
                concurrency = block(text, 'concurrency')
                self.assertIsNotNone(concurrency, 'CI workflows need a concurrency group')
                self.assertRegex(concurrency, r'(?m)^  group: .*github\.ref')
                self.assertIn(f'  cancel-in-progress: {STANDARD_CANCEL}\n', concurrency)

    def test_operations_never_cancel_in_progress(self):
        for name in OPERATIONS:
            concurrency = block(self.workflows()[name], 'concurrency') or ''
            with self.subTest(workflow=name):
                self.assertNotRegex(concurrency, r'cancel-in-progress: (?!false)')


class WorkflowSecurityTest(unittest.TestCase):
    def test_prs_cannot_enter_production_publish_job(self):
        text = (WORKFLOWS / 'website.yml').read_text()
        publish = text.split('  publish:\n', 1)[1]
        self.assertIn("    if: github.triggering_actor == 'genixpro' && github.ref == 'refs/heads/main' && (github.event_name == 'push' || github.event_name == 'workflow_dispatch')\n", publish)
        self.assertNotIn('pull_request', publish)
        verify = text.split('  verify:\n', 1)[1].split('  publish:\n', 1)[0]
        self.assertNotIn('id-token: write', verify)
        self.assertNotIn('google-github-actions/auth@', verify)
        self.assertNotIn('environment:', verify)

    def test_rollback_requires_main_and_manual_event(self):
        text = (WORKFLOWS / 'rollback.yml').read_text()
        self.assertIn("    if: github.triggering_actor == 'genixpro' && github.ref == 'refs/heads/main' && github.event_name == 'workflow_dispatch'\n", text)
        self.assertNotIn('id-token: write', block(text, 'permissions'))

    def test_authenticated_jobs_require_the_sole_operator(self):
        for name in ['website.yml', 'rollback.yml', 'rankings.yml', 'guide-media.yml']:
            text = (WORKFLOWS / name).read_text()
            with self.subTest(workflow=name):
                self.assertIn("    if: github.triggering_actor == 'genixpro' && github.ref == 'refs/heads/main'", text)

    def test_metadata_check_cannot_write_or_create_prs(self):
        text = (WORKFLOWS / 'releases.yml').read_text()
        self.assertEqual(block(text, 'permissions'), '  contents: read\n')
        self.assertNotIn('git push', text)
        self.assertNotIn('gh pr create', text)
        self.assertIn('name: reviewed-download-metadata', text)

    def test_actions_are_pinned_and_untrusted_triggers_are_absent(self):
        for path in WORKFLOWS.glob('*.y*ml'):
            text = path.read_text()
            with self.subTest(workflow=path.name):
                self.assertNotIn('pull_request_target:', text)
                self.assertNotIn('workflow_run:', text)
                for action in re.findall(r'uses: ([^\s#]+)', text):
                    self.assertRegex(action, r'^[^@]+@[0-9a-f]{40}$')


if __name__ == '__main__':
    unittest.main()
