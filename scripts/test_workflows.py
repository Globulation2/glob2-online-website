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
OPERATIONS = {'monitor.yml', 'rankings.yml', 'releases.yml', 'rollback.yml'}


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


if __name__ == '__main__':
    unittest.main()
