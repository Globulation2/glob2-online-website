# Public rankings snapshots

The website consumes a durable public JSON snapshot, rather than authenticated
account endpoints. `publish-rankings.py` reads the existing platform endpoint
`GET /api/v1/leaderboards/{ladder}?limit=200&provisional=include`. That endpoint
already selects active registered accounts with rated games and excludes banned
accounts, guests and AI. The publisher does not query account databases.

The output is schema version 1:

```json
{
  "schemaVersion": 1,
  "generatedAt": "2026-10-02T12:00:00Z",
  "backendRevision": "6dbb6bfb",
  "ratingPolicy": "openskill-plackett-luce-v1",
  "ladder": "ranked-1v1",
  "hasMore": false,
  "entries": [
    {"rank": 1, "username": "Player", "rating": 1500.5, "provisional": false, "games": 12}
  ]
}
```

`username` is the public display name, not the private login identifier.
Ranks, order, rating precision and provisional flags are authoritative platform
values. Do not recompute competition ranks or label this Elo: the model is
OpenSkill Plackett-Luce, on the platform's displayed rating scale. `hasMore`
means only the first 200 competitors are included. Empty entries is a valid
empty ladder, not a publishing error. The timestamp is snapshot collection
start time, not the time a rating last changed.

## Publish

Run with Python 3 and gcloud authenticated through GitHub Workload Identity
Federation or an attached Google service identity. No service-account key is
needed. The scheduled workflow runs every five minutes on a best-effort GitHub
schedule; the website must show the timestamp and stale/unavailable state.

```sh
python3 scripts/publish-rankings.py \
  --api-origin https://app.glob2online.com \
  --ladder ranked-1v1 \
  --backend-revision DEPLOYED_BACKEND_COMMIT_HEX \
  --bucket YOUR_PUBLIC_FEED_BUCKET --object rankings/v1.json
```

Set `--backend-revision` to the **deployed API commit**, not the website commit.
The publisher identity needs object get/create/update for the target bucket;
restrict its IAM binding to the rankings object. Readers need only public read
of the published feed. Configure bucket GET CORS for the production website
origins; no credentials or wildcard authenticated origin is needed. Keep feed
objects separate from private game artifacts. The GCS object cache lifetime is
60 seconds. Bucket retention policies must allow updates to this object.

Local execution is protected by a nonblocking file lock; GitHub workflow
concurrency prevents overlapping scheduled runs. GCS generation preconditions
also prevent overlapping writers from replacing a winner's object. The previous
object is read at its pinned generation, and older/equal timestamp snapshots are
skipped. HTTP/API/schema/privacy/IAM/upload errors preserve the last valid object.
A malformed existing object fails closed and needs explicit operator recovery.
The publisher rejects unexpected account fields rather than accidentally
publishing a changed API privacy surface. It logs no tokens or account payloads.

A VM timer can run the same command if tighter scheduling is required later.
Place it beside the backend, use an attached identity and `Type=oneshot` with
`TimeoutStartSec=90`; a five-minute timer must not expose new ports or mount
private account storage. No API/backend code changes or service restart are
required for either mode.

## Verification

```sh
python3 -m unittest discover -s scripts -p 'test_publish_rankings.py' -v
```

Tests cover privacy projections, malformed source data, guest/AI rejection,
authoritative ordering, ties, empty/truncated ladders, monotonic publication,
concurrent writes, upload failures, bootstrap and corrupt previous feeds.
After deploying, verify the live feed contains no fields beyond the documented
allowlist, and stop a publication run to confirm the website keeps the previous
snapshot with its actual timestamp. Cached banned-player removal may lag the
next successful publication plus the 60-second cache lifetime; do not claim
instantaneous moderation propagation.
