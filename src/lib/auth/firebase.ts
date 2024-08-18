import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { env } from '../../env';

const app = initializeApp(env.firebase);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

const FIREBASE_ERROR_FALLBACK_MESSAGE = 'Something went wrong. Please try again later.';

const FIREBASE_ERROR_MAP: Record<string, string> = {
  'auth/user-not-found': 'User not found',
  'auth/wrong-password': 'Wrong password',
};

export const handleFirebaseAuthError = (code: string): string => {
  return FIREBASE_ERROR_MAP[code] ?? FIREBASE_ERROR_FALLBACK_MESSAGE;
};
