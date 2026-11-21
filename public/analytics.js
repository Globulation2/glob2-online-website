/* Optional website analytics: basic opt-in, no Google requests before consent. */
(() => {
  'use strict';
  const id = document.currentScript?.dataset.measurementId;
  const panel = document.getElementById('analytics-choice');
  const allow = document.getElementById('analytics-allow');
  const reject = document.getElementById('analytics-reject');
  const settings = document.getElementById('analytics-settings');
  const status = document.getElementById('analytics-status');
  if (!panel || !allow || !reject || !settings || !status) return;
  const key = 'glob2-analytics-choice-v1';
  const lifetime = 183 * 86400000;
  const production = location.hostname === 'glob2.online';
  const blocked = navigator.globalPrivacyControl === true || navigator.doNotTrack === '1';
  let active = false;
  let lastFocus;
  function readChoice() {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && (value.choice === 'allow' || value.choice === 'reject') && Number.isFinite(value.at) && value.at <= Date.now() && Date.now() - value.at < lifetime ? value.choice : null;
    } catch { return null; }
  }
  function saveChoice(choice) {
    try { localStorage.setItem(key, JSON.stringify({ choice, at: Date.now() })); } catch { /* A blocked store means asking again next page. */ }
  }
  function clearCookies() {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['', '; Domain=glob2.online', '; Domain=.glob2.online']) {
        document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax; Secure`;
      }
    }
  }
  function originOnly(value) {
    try { const url = new URL(value); return /^https?:$/.test(url.protocol) ? url.origin : ''; } catch { return ''; }
  }
  function pageLocation() {
    const value = new URL(location.origin + location.pathname);
    const params = new URLSearchParams(location.search);
    for (const name of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
      const raw = params.get(name);
      // Campaign labels are public, deliberately limited identifiers. Do not
      // forward arbitrary query strings, email addresses, searches or fragments.
      if (raw && /^[a-zA-Z0-9_-]{1,120}$/.test(raw)) value.searchParams.set(name, raw);
    }
    return value.href;
  }
  function close() {
    panel.hidden = true;
    if (lastFocus instanceof HTMLElement) lastFocus.focus();
  }
  function start() {
    if (active || blocked || !production || !/^G-[A-Z0-9]+$/.test(id || '') || location.pathname.startsWith('/design/')) return;
    active = true;
    window[`ga-disable-${id}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    const configuration = {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: 'none', cookie_expires: 90 * 86400, cookie_update: false,
      cookie_flags: 'SameSite=Lax;Secure',
      page_location: pageLocation(), page_referrer: originOnly(document.referrer),
    };
    // Apply globally before the loader initializes its destination. A stream's
    // remote Google-tag configuration can initialize ahead of a queued config.
    window.gtag('set', configuration);
    window.gtag('js', new Date());
    window.gtag('config', id, configuration);
    window.gtag('event', 'page_view', { page_location: pageLocation(), page_referrer: originOnly(document.referrer), page_title: document.title });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.append(script);
  }
  allow.addEventListener('click', () => { if (blocked) return; saveChoice('allow'); start(); close(); });
  reject.addEventListener('click', () => {
    saveChoice('reject');
    window[`ga-disable-${id}`] = true;
    clearCookies();
    close();
    if (active) location.reload();
  });
  settings.addEventListener('click', () => {
    lastFocus = settings;
    panel.hidden = false;
    status.textContent = blocked ? 'Analytics is off because your browser sends a privacy preference.' : readChoice() === 'allow' ? 'Analytics is currently allowed. You can reject it at any time.' : 'Analytics is currently off.';
    reject.focus();
  });
  allow.disabled = blocked;
  if (blocked) { window[`ga-disable-${id}`] = true; clearCookies(); }
  const choice = readChoice();
  if (choice === 'allow') start();
  else if (!choice && !blocked && production) panel.hidden = false;
  document.addEventListener('click', event => {
    if (!active || window[`ga-disable-${id}`] || !(event.target instanceof Element)) return;
    const link = event.target.closest('a[href]');
    if (!link) return;
    const target = new URL(link.href, location.href);
    let name;
    let destination;
    if (target.hostname === 'app.glob2.online' && /^\/play\/?$/.test(target.pathname)) { name = 'play_click'; destination = 'browser'; }
    else if (target.hostname === 'apps.microsoft.com') { name = 'store_click'; destination = 'microsoft'; }
    else if (target.hostname === 'apps.apple.com') { name = 'store_click'; destination = 'apple'; }
    else if (target.hostname === 'play.google.com') { name = 'store_click'; destination = 'google_play'; }
    else if (target.hostname === 'snapcraft.io') { name = 'store_click'; destination = 'snap'; }
    else if (target.hostname === 'github.com' && target.pathname.startsWith('/Globulation2/glob2/releases/download/')) { name = 'download_click'; destination = /\.(?:tar\.gz|zip)$/.test(target.pathname) ? 'archive' : 'installer'; }
    if (!name) return;
    window.gtag('event', name, { destination, link_url: target.origin + target.pathname, page_location: pageLocation(), page_referrer: originOnly(document.referrer), transport_type: 'beacon' });
  });
})();
