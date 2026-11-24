"""Test the retirement boundary and the effects of incomplete observations."""

import datetime as dt
import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location(
    'publish_twitch_status', Path(__file__).with_name('publish-twitch-status.py'),
)
publisher = importlib.util.module_from_spec(spec)
spec.loader.exec_module(publisher)
START = dt.datetime(2026, 11, 24, tzinfo=dt.timezone.utc)


class TwitchStatusTest(unittest.TestCase):
    def test_offline_window_retires_exactly_once(self):
        status = None
        days = publisher.INACTIVITY.days
        for day in range(days):
            status = publisher.next_status(status, False, START + dt.timedelta(days=day))
            self.assertFalse(status['retired'])
            self.assertEqual(status['offlineSince'], publisher.format_time(START))
        retired = publisher.next_status(status, False, START + dt.timedelta(days=days))
        self.assertTrue(retired['retired'])
        self.assertEqual(publisher.next_status(retired, True, START + dt.timedelta(days=days + 1)), retired)

    def test_live_observation_resets_offline_window(self):
        first = publisher.next_status(None, False, START)
        live = publisher.next_status(first, True, START + dt.timedelta(hours=1))
        self.assertIsNone(live['offlineSince'])
        second = publisher.next_status(live, False, START + dt.timedelta(hours=2))
        self.assertEqual(second['offlineSince'], publisher.format_time(START + dt.timedelta(hours=2)))

    def test_gap_does_not_count_as_verified_inactivity(self):
        first = publisher.next_status(None, False, START)
        resumed_at = START + publisher.INACTIVITY
        resumed = publisher.next_status(first, False, resumed_at)
        self.assertEqual(resumed['offlineSince'], publisher.format_time(resumed_at))
        self.assertFalse(resumed['retired'])

    def test_future_checked_at_does_not_advance_state(self):
        first = publisher.next_status(None, False, START)
        with self.assertRaises(ValueError):
            publisher.next_status(first, False, START - dt.timedelta(seconds=1))
