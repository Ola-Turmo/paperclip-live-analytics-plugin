import { MAP_CONFIG } from './map-config.js';
import { getCountryCentroid } from './country-centroids.js';

export function getCountryBubbleCount(country) {
  const visitors = Number(country?.visitors || 0);
  if (visitors > 0) return visitors;
  const sessions = Number(country?.sessions || 0);
  const events = Number(country?.events || 0);
  return sessions > 0 || events > 0 ? 1 : 0;
}

export function getCountryBubbleSize(displayCount) {
  return Math.max(34, Math.min(70, 26 + (Number(displayCount || 0) * 8)));
}

export function buildCountryMapItems(countries = []) {
  return countries
    .map((country) => {
      const centroid = getCountryCentroid(country.country);
      if (!centroid) return null;
      return {
        code: centroid.code,
        name: centroid.name,
        latitude: centroid.latitude,
        longitude: centroid.longitude,
        visitors: Number(country.visitors || 0),
        sessions: Number(country.sessions || 0),
        events: Number(country.events || 0),
        displayCount: getCountryBubbleCount(country),
        bubbleSize: getCountryBubbleSize(getCountryBubbleCount(country)),
      };
    })
    .filter(Boolean);
}

export function getMapFocus(items = [], hotCountryCode = null) {
  const normalizedHotCountry = String(hotCountryCode || '').trim().toUpperCase();
  const hotCountry = normalizedHotCountry
    ? items.find((item) => item.code === normalizedHotCountry)
    : null;

  if (hotCountry) {
    return {
      mode: 'hot',
      center: [Math.max(-75, Math.min(75, hotCountry.latitude - 1.8)), hotCountry.longitude],
      zoom: MAP_CONFIG.hotCountryZoom,
      countryCode: hotCountry.code,
    };
  }

  if (items.length === 1) {
    return {
      mode: 'single',
      center: [Math.max(-75, Math.min(75, items[0].latitude - 1.8)), items[0].longitude],
      zoom: MAP_CONFIG.singleCountryZoom,
      countryCode: items[0].code,
    };
  }

  return {
    mode: 'world',
    center: MAP_CONFIG.worldCenter,
    zoom: MAP_CONFIG.worldZoom,
    countryCode: null,
  };
}
