import type { User as FirebaseUser } from 'firebase/auth';

export interface User extends FirebaseUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  postCode: string;
  street: string;
  houseNumber: string;
  isGuest: boolean;
}
