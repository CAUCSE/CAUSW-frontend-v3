const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

// Run the actual TypeScript policy with Node's built-in test runner.
function loadSource(relativePath, imports = {}, globals = {}) {
  const source = fs.readFileSync(
    path.join(__dirname, '../src', relativePath),
    'utf8',
  );
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const exports = {};
  vm.runInNewContext(outputText, {
    exports,
    require: (id) => {
      assert.ok(id in imports, `Unexpected import: ${id}`);
      return imports[id];
    },
    ...globals,
  });
  return exports;
}

const stores = loadSource('shared/constants/app-stores.ts');
const config = loadSource(
  'features/sticky-app-banner/config/stickyAppBanner.ts',
);
const policy = loadSource('features/sticky-app-banner/model/policy.ts', {
  '@/shared/constants': stores,
  '../config': config,
});

test('dismissal expires exactly 24 hours later and rejects invalid values', () => {
  const now = 1_800_000_000_000;
  const expiry = now + config.STICKY_APP_BANNER_HIDE_DURATION;
  assert.equal(config.STICKY_APP_BANNER_HIDE_DURATION, 86_400_000);
  assert.equal(policy.getHiddenUntil(String(expiry), now), expiry);
  assert.equal(policy.getHiddenUntil(String(expiry), expiry - 1), expiry);
  assert.equal(policy.getHiddenUntil(String(expiry), expiry), 0);
  for (const value of [
    null,
    '',
    'broken',
    'Infinity',
    '-1',
    String(expiry + 1),
  ]) {
    assert.equal(policy.getHiddenUntil(value, now), 0);
  }
});

test('OS detection includes iPad desktop mode and unknown devices', () => {
  for (const ua of ['iPhone', 'iPad', 'iPod']) {
    assert.equal(policy.getBannerEnvironment(ua).os, 'ios');
  }
  assert.equal(policy.getBannerEnvironment('Macintosh', 5).os, 'ios');
  assert.equal(policy.getBannerEnvironment('Macintosh', 0).os, 'unknown');
  assert.equal(policy.getBannerEnvironment('Linux; Android 15').os, 'android');
  assert.equal(policy.getBannerEnvironment('Windows NT').os, 'unknown');
});

test('in-app detection and Android intent preserve the HTTPS store fallback', () => {
  for (const ua of [
    'KAKAOTALK',
    'Instagram',
    'FBAN',
    'FBAV',
    'NAVER',
    'Line/1',
  ]) {
    assert.equal(policy.getBannerEnvironment(ua).inApp, true);
  }
  assert.equal(policy.getBannerEnvironment('Safari').inApp, false);
  assert.equal(policy.getMarketLink('ios', true), stores.APP_STORE_URL);
  assert.equal(policy.getMarketLink('android', false), stores.GOOGLE_PLAY_URL);
  const intent = policy.getMarketLink('android', true);
  assert.ok(intent.startsWith('intent://details?id=kr.co.causwv2.twa'));
  assert.ok(intent.includes('package=com.android.vending;'));
  const fallback = intent.match(/S.browser_fallback_url=([^;]+)/)[1];
  assert.equal(decodeURIComponent(fallback), stores.GOOGLE_PLAY_URL);
});

test('GA queues an impression before its script loads and sends later clicks directly', () => {
  const window = {};
  const analytics = loadSource(
    'shared/lib/analytics/google-analytics.ts',
    {
      '@/shared/config': { GA_MEASUREMENT_ID: 'G-TEST' },
    },
    { window },
  );
  analytics.trackGoogleAnalyticsEvent('view_sticky_banner', { os: 'ios' });
  assert.equal(window.dataLayer.length, 1);
  assert.deepEqual(Array.from(window.dataLayer[0]), [
    'event',
    'view_sticky_banner',
    { os: 'ios' },
  ]);
  let sent;
  window.gtag = (...args) => {
    sent = args;
  };
  analytics.trackGoogleAnalyticsEvent('click_sticky_banner_cta', { os: 'ios' });
  assert.deepEqual(sent, ['event', 'click_sticky_banner_cta', { os: 'ios' }]);
  assert.equal(window.dataLayer.length, 1);
});

test('GA stays disabled without a measurement ID', () => {
  const window = {};
  const analytics = loadSource(
    'shared/lib/analytics/google-analytics.ts',
    {
      '@/shared/config': { GA_MEASUREMENT_ID: '' },
    },
    { window },
  );
  analytics.trackGoogleAnalyticsEvent('view_sticky_banner', {});
  assert.equal(window.dataLayer, undefined);
});

function loadMixpanel() {
  const calls = [];
  const mixpanelMock = {
    init: () => {},
    identify: (id) => calls.push(['identify', id]),
    // vm 컨텍스트에서 만든 객체는 prototype 이 달라 deepEqual 이 실패하므로 일반 객체로 복사
    track: (...args) =>
      calls.push(['track', ...JSON.parse(JSON.stringify(args))]),
    reset: () => {},
  };
  const analytics = loadSource(
    'shared/lib/analytics/mixpanel.ts',
    {
      'mixpanel-browser': { __esModule: true, default: mixpanelMock },
      '@/shared/config': { ENVIRONMENT: 'test', MIXPANEL_TOKEN: 'token' },
    },
    { window: {} },
  );
  return { analytics, calls };
}

test('Mixpanel sends the CTA click by beacon even before identify', () => {
  const { analytics, calls } = loadMixpanel();
  const properties = { os: 'ios', is_in_app: false };

  analytics.trackMixpanelEvent({ name: 'view_sticky_banner', properties });
  analytics.trackMixpanelEvent({ name: 'click_sticky_banner_cta', properties });

  // 노출 이벤트는 identify 전까지 대기, CTA 클릭은 페이지 이탈 전에 즉시 전송
  assert.deepEqual(calls, [
    [
      'track',
      'click_sticky_banner_cta',
      properties,
      { transport: 'sendBeacon', send_immediately: true },
    ],
  ]);

  analytics.identifyMixpanelUser('user-1');
  assert.deepEqual(
    calls.slice(1).map(([type, name]) => [type, name]),
    [
      ['identify', 'user-1'],
      ['track', 'app_opened'],
      ['track', 'view_sticky_banner'],
    ],
  );
});

test('Mixpanel uses beacon transport for the CTA click after identify too', () => {
  const { analytics, calls } = loadMixpanel();
  analytics.identifyMixpanelUser('user-1');
  calls.length = 0;

  analytics.trackMixpanelEvent({
    name: 'click_sticky_banner_cta',
    properties: { os: 'android', is_in_app: true },
  });
  analytics.trackMixpanelEvent({
    name: 'click_sticky_banner_close',
    properties: { os: 'android', is_in_app: true },
  });

  assert.deepEqual(calls[0][3], {
    transport: 'sendBeacon',
    send_immediately: true,
  });
  assert.equal(calls[1].length, 3);
});
