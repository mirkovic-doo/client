export interface LoginForm {
  email: string;
  password: string;
  [key: string]: string;
}

export interface SignUpForm {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  postCode: string;
  street: string;
  houseNumber: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
}
