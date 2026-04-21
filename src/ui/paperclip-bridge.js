import { useEffect, useState } from 'react';
import { ACTION_KEYS, DATA_KEYS } from '../shared/constants.js';
import { deriveWidgetSummary } from '../shared/live-state.js';
import {
  createDefaultAuthState,
  createDefaultSettings,
  createEmptyCompanyLiveState,
} from '../shared/defaults.js';

function getBridge() {
  return globalThis.__PAPERCLIP_PLUGIN_BRIDGE__ || null;
}

function createFallbackSettingsData() {
  return {
    settings: createDefaultSettings(),
    auth: createDefaultAuthState(),
    discoveredProjects: [],
    validation: {
      warnings: ['Paperclip bridge unavailable. Connect this plugin from a live Paperclip surface.'],
      errors: [],
    },
    projectListError: 'Paperclip bridge unavailable',
  };
}

function getFallbackData(key) {
  const emptyLiveState = createEmptyCompanyLiveState();
  if (key === DATA_KEYS.livePageLoad) return emptyLiveState;
  if (key === DATA_KEYS.liveWidgetLoad) return deriveWidgetSummary(emptyLiveState);
  if (key === DATA_KEYS.settingsLoad) return createFallbackSettingsData();
  return null;
}

export function useHostContext() {
  const bridge = getBridge();
  if (bridge?.useHostContext) {
    return bridge.useHostContext();
  }

  const params = new URLSearchParams(globalThis.location?.search || '');
  return {
    companyId: params.get('companyId') || null,
    surface: params.get('surface') || 'page',
    basePath: '',
  };
}

export function usePluginData(key, payload, options = {}) {
  const bridge = getBridge();
  if (bridge?.usePluginData) {
    return bridge.usePluginData(key, payload, options);
  }

  const [data, setData] = useState(() => getFallbackData(key));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function reload() {
    setLoading(true);
    try {
      setData(getFallbackData(key));
      setError(null);
    } catch (loadError) {
      setError(loadError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (options.enabled === false) return;
    void reload();
  }, [key, JSON.stringify(payload), options.enabled]);

  return { data, loading, error, reload };
}

export function usePluginAction(key) {
  const bridge = getBridge();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  async function run(payload) {
    setPending(true);
    setError(null);
    try {
      if (bridge?.runAction) {
        return await bridge.runAction(key, payload);
      }
      throw new Error(`Paperclip bridge unavailable for action '${key}'. Open this plugin inside a live Paperclip instance.`);
    } catch (actionError) {
      setError(actionError);
      throw actionError;
    } finally {
      setPending(false);
    }
  }

  return { run, pending, error };
}

export function usePluginStream(channel, { companyId, onEvent }) {
  const bridge = getBridge();

  useEffect(() => {
    if (bridge?.subscribeStream) {
      return bridge.subscribeStream(channel, { companyId }, onEvent);
    }
    return undefined;
  }, [bridge, channel, companyId, onEvent]);
}
