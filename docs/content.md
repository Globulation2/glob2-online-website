# Content maintenance

Use reviewed PRs for current guides, news, community URLs, event records and release metadata. The CI preview shows the change before publication. Coding agents follow AGENTS.md and verify claims against the game repository or public release artifacts.

## Current and historical content

Content collections validate title, description, locale, tags, ordering, publication date and source links. Guides should record reviewedAgainst where a particular revision supports the advice. Avoid exact mechanics claims until verified in source and play. The historical archive carries source links and clear context; obsolete hosting or download instructions must never be presented as current.

The migration manifest in content/migration-manifest.json records the audited wiki pages and intended destinations. Add attribution, source revision/date/language, rights and verification status for each additional source. Link rather than copy when rights are unknown. Public-only access does not preserve the wiki's full revision history; do not claim a complete backup or retirement of the original site.

## Events and downloads

Event records in src/data/events.json require a unique slug, title, UTC start, optional end, IANA display timezone, format, organizer, status and rules. Registration links use HTTPS; published results are editorial. No events, registrations or standings should be fabricated. The provider interface currently reads Git content; actual bracket/registration backend integration is a separate feature.

The Check download metadata workflow fetches published game releases. Review asset names and target platforms before applying the generated metadata. The source repository and release index remain available when no verified package is listed.

## Review

Substantial changes require two rendered rounds: factual/editorial review and usability/accessibility/integration review. Test newcomer play/download journeys, strategy discovery, original-source attribution, responsive navigation and community actions. Keep reports/screenshots in ignored artifacts; durable conclusions belong here or in the relevant guide.

## Player handbook

See [handbook production](handbook-production.md) for research ownership, gameplay capture, independent review, media storage and article publication.
