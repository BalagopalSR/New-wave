const SESSION_KEY = 'newwave_admin_session';

export const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME ?? 'admin';
export const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'newwave2025';

export type AdminSession = {
  username: string;
  loggedInAt: number;
};

export function getAdminSession(): AdminSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AdminSession;
    if (!session?.username) return null;
    return session;
  } catch {
    return null;
  }
}

export function isAdminAuthenticated(): boolean {
  return getAdminSession() !== null;
}

export function setAdminSession(username: string) {
  const session: AdminSession = {
    username,
    loggedInAt: Date.now(),
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function validateAdminCredentials(username: string, password: string): boolean {
  return (
    username.trim().toLowerCase() === ADMIN_USERNAME.toLowerCase() &&
    password === ADMIN_PASSWORD
  );
}
