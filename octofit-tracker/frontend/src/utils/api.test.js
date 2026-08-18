import test from 'node:test';
import assert from 'node:assert/strict';

import { shouldShowCodespaceWarning } from './api.js';

test('does not warn in local development when VITE_CODESPACE_NAME is missing', () => {
  assert.equal(shouldShowCodespaceWarning(), false);
  assert.equal(shouldShowCodespaceWarning(), false);
});

test('does not warn in GitHub Codespaces when the variable is missing', () => {
  assert.equal(shouldShowCodespaceWarning(), false);
});

test('does not warn when the codespace name is configured', () => {
  assert.equal(shouldShowCodespaceWarning(), false);
});
