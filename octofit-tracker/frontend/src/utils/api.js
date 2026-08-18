export function getCodespaceNameFromHostname(hostname = typeof window !== 'undefined' ? window.location.hostname : '') {
  if (!hostname) {
    return '';
  }

  const match = hostname.match(/^([a-z0-9-]+)-\d+\.app\.github\.dev$/i);
  return match ? match[1] : '';
}

export function shouldShowCodespaceWarning() {
  return false;
}

export function getApiBaseUrl(
  env = import.meta.env,
  hostname = typeof window !== 'undefined' ? window.location.hostname : '',
) {
  const codespaceName = (env.VITE_CODESPACE_NAME ?? '').trim() || getCodespaceNameFromHostname(hostname);

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function getApiUrl(resource) {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}/api/${resource}/`;
}

export function normalizeRecords(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
}
