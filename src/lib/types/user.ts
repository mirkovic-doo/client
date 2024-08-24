export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  postCode: string;
  street: string;
  houseNumber: string;
  isGuest: boolean;
}

export interface UpdateUserForm {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  postCode: string;
  street: string;
  houseNumber: string;
  [key: string]: string;
}
