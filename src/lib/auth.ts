const OWNER_CREDENTIALS = {
  username: 'admin',
  password: 'alecoman2024',
};

export function validateCredentials(username: string, password: string): boolean {
  const cleanUser = username.trim();
  const cleanPass = password.trim();
  // Username is case‑insensitive; password remains case‑sensitive
  return cleanUser.toLowerCase() === OWNER_CREDENTIALS.username.toLowerCase() && cleanPass === OWNER_CREDENTIALS.password;
}
