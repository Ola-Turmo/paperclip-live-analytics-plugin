import test from 'node:test';
import assert from 'node:assert/strict';

import { getCountryCentroid } from '../src/shared/country-centroids.js';
import { buildCountryMapItems, getCountryBubbleCount, getCountryBubbleSize, getMapFocus } from '../src/shared/map-model.js';

test('country centroid lookup resolves common country codes', () => {
  assert.deepEqual(getCountryCentroid('us'), {
    code: 'US',
    latitude: 39.8283,
    longitude: -98.5795,
    name: 'United States',
  });
  assert.equal(getCountryCentroid('IL').code, 'IL');
  assert.equal(getCountryCentroid('GB').code, 'GB');
});

test('country centroid lookup skips unknown codes', () => {
  assert.equal(getCountryCentroid('ZZ'), null);
  assert.equal(getCountryCentroid(null), null);
});

test('country bubble count prefers visitors with session and event fallback', () => {
  assert.equal(getCountryBubbleCount({ visitors: 4, sessions: 9, events: 11 }), 4);
  assert.equal(getCountryBubbleCount({ visitors: 0, sessions: 2, events: 0 }), 1);
  assert.equal(getCountryBubbleCount({ visitors: 0, sessions: 0, events: 3 }), 1);
  assert.equal(getCountryBubbleCount({ visitors: 0, sessions: 0, events: 0 }), 0);
});

test('country bubble size remains within the expected visual range', () => {
  assert.equal(getCountryBubbleSize(1), 34);
  assert.equal(getCountryBubbleSize(4), 58);
  assert.equal(getCountryBubbleSize(20), 70);
});

test('buildCountryMapItems normalizes countries and skips unknown centroids', () => {
  const items = buildCountryMapItems([
    { country: 'il', visitors: 1, sessions: 2, events: 3 },
    { country: 'zz', visitors: 4, sessions: 5, events: 6 },
  ]);

  assert.equal(items.length, 1);
  assert.equal(items[0].code, 'IL');
  assert.equal(items[0].displayCount, 1);
});

test('map focus chooses hot country first, then single country, then world', () => {
  const multi = buildCountryMapItems([
    { country: 'US', visitors: 3, sessions: 3, events: 6 },
    { country: 'IL', visitors: 1, sessions: 2, events: 2 },
  ]);

  assert.equal(getMapFocus(multi, 'IL').mode, 'hot');
  assert.equal(getMapFocus(multi, 'IL').countryCode, 'IL');

  const single = buildCountryMapItems([
    { country: 'US', visitors: 3, sessions: 3, events: 6 },
  ]);
  assert.equal(getMapFocus(single, null).mode, 'single');
  assert.equal(getMapFocus(single, null).countryCode, 'US');

  assert.equal(getMapFocus(multi, null).mode, 'world');
});
