// Minimal in-memory session store.
// Swap to secure persistence later (Keychain/Keystore) if needed.

let session = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

export const sessionStore = {
  get: () => session,
  set: next => {
    session = { ...session, ...(next || {}) };
    return session;
  },
  clear: () => {
    session = { accessToken: null, refreshToken: null, user: null };
  },
};
