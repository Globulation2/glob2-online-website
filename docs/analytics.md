# Optional website analytics

Configured on 20 November 2026 for `https://glob2.online/`: GA4 property
`565351683`, web stream `16385410969`, public measurement ID `G-C1ZQ1XR0J1`.
The website does not use
Measurement Protocol secrets, Google Tag Manager containers, account IDs or app
activity markers. The stream's enhanced measurement is disabled so searches,
forms and arbitrary outbound links are not automatically recorded.

The signed-in property setup confirmed Canada / Toronto reporting timezone and
CAD reporting currency; event and user retention are both two months, with
retention reset on activity off. Google signals, user-provided data collection
and granular location/device collection are off. Advertising personalization is
disabled for all 307 available regions. These account settings complement the
tag controls and should be rechecked if another operator changes the property.

## Consent and collection

`public/analytics.js` implements basic opt-in: no Google tag or collection request
before **Allow analytics**. **Reject analytics** has equal prominence. A functional
local-storage record remembers either choice for 183 days. **Analytics settings**
in the footer reopens the panel. Rejecting after allowing disables collection,
deletes website `_ga` cookies and reloads the page. Prior events are not erased.
Do Not Track and Global Privacy Control override an earlier permission. Invalid
or expired choices require a new choice. With storage blocked, choices last only
for the current page. Analytics only starts on the canonical production hostname;
localhost, Firebase previews and `/design/` references never load the tag.

Consent text and settings are currently English, matching the English-only legal
policy. The panel declares English and left-to-right direction, including on RTL
pages; localized footer links explicitly mark English. The existing 194-field
reviewed marketing catalogs remain intact. Reviewed consent translations are
future work; this does not claim fully localized analytics controls.

Analytics cookies are host-only and have a 90-day lifetime. The tag sets
`cookie_update: false` for the browser identifier. The tag denies advertising storage, advertising user data and advertising
personalization; Google signals and ad-personalization signals are also disabled.
No `user_id`, account data, form values or site-search terms are sent. Advertising
pixels are not included.

Page addresses contain origin/path and only `utm_source`, `utm_medium`,
`utm_campaign`, `utm_content` values matching 1–120 ASCII letters, digits,
underscores or hyphens. Other query parameters and fragments are excluded.
Referrers contain origin only. Do not put names, email addresses or private
identifiers in campaign tags. A full browser title is sent with a page view;
website titles are editorial content, never user-entered search terms.

| Event | Meaning | Extra event parameters |
| --- | --- | --- |
| `page_view` | A page viewed by a browser that allowed analytics | Sanitized page address and referring origin |
| `store_click` | Click through to a listed store | `destination`: microsoft, apple, google_play or snap; canonical `link_url` |
| `download_click` | Click on a GitHub release asset | `destination`: archive or installer; canonical `link_url` |
| `play_click` | Click through to browser play | `destination`: browser; canonical `link_url` |

`destination` is registered as the event-scoped custom dimension **Destination**.
New custom definitions can take time to appear in reports. The three click event
names are also configured as key events, without a default monetary value and
with once-per-session counting. Raw event counts count individual clicks;
key-event counts deduplicate repeated actions of the same type within a session.

Clicks represent intent, not completed installs, store purchases or started games.
Links are not delayed or prevented by analytics. Browser transport/blocking can
lose events. Consent is required independently on each browser. Campaign tags
are read from the page where consent is given; attribution before consent is not
stored. Rejected visits, blocked scripts, shared devices and cleared cookies mean
GA's users are estimates of consented browsers, not a census of unique people.
Data starts at deployment and consent; this cannot reconstruct prior traffic.

## Campaigns and reports

Open the [Glob2 Analytics dashboard](https://analytics.google.com/analytics/web/#/a296778483p565351683/reports/intelligenthome)
with an account that has access to the property.

For a LinkedIn post, use e.g.
`https://glob2.online/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=launch_v1&utm_content=colony_post`.
For a paid promotion use `utm_medium=paid_social` and a distinct `utm_content`.
Keep labels consistent; do not relabel an organic post as paid merely because
its surrounding platform also has advertising. Existing untagged links can only
provide the referring origin when the browser supplies it.

Use GA4 Realtime to check a consenting production visit; ordinary acquisition and
engagement reports need processing time. Compare the same complete day ranges
and timezone. Traffic acquisition groups by session source/medium/campaign;
Engagement / Events shows the three intent events. A rise after a post is an
association; campaign-tagged visits provide stronger attribution than timing.
Do not count operator validation events as genuine campaign results.

Run `npm run check`, `npm run build`, and
`npx playwright test tests/analytics.spec.ts` to verify gating, sanitization,
clicks, withdrawal, privacy signals and preview exclusion. Tests serve the built
production CSP under an intercepted canonical origin and stub Google, so they
never pollute the production property. Live network verification is separate
from proof that GA has processed an event into its reports.

References: [Google basic consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode),
[GA4 configuration fields](https://developers.google.com/analytics/devguides/collection/ga4/reference/config),
[GA4 CSP guidance](https://developers.google.com/tag-platform/security/guides/csp).
