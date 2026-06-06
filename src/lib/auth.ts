const OWNER_CREDENTIALS = {
  username: 'admin',
  password: 'alecoman2024',
};

export function validateCredentials(username: string, password: string): boolean {
  return username === OWNER_CREDENTIALS.username && password === OWNER_CREDENTIALS.password;
}
