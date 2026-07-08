const STORAGE_ROLE_KEY = 'bucc-auth-role';
const STORAGE_TOKEN_KEY = 'bucc-auth-token';

export function getSession() {
  const token = localStorage.getItem(STORAGE_TOKEN_KEY);
  const role = localStorage.getItem(STORAGE_ROLE_KEY);
  if (!token || !role) {
    return null;
  }

  return { token, role };
}

export function saveSession(role) {
  localStorage.setItem(STORAGE_TOKEN_KEY, 'demo-token');
  localStorage.setItem(STORAGE_ROLE_KEY, role);
}

export function clearSession() {
  localStorage.removeItem(STORAGE_TOKEN_KEY);
  localStorage.removeItem(STORAGE_ROLE_KEY);
}