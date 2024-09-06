import { z } from 'zod';

export const logInFormSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: 'This field is required.' })
    .email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .trim()
    .nonempty({ message: 'This field is required.' })
    .min(6, { message: 'Password must be at least 6 characters long.' }),
});

export const signUpFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .nonempty({ message: 'This field is required.' })
      .email({ message: 'Invalid email address.' }),
    firstName: z.string().trim().nonempty({ message: 'First name is required.' }),
    lastName: z.string().trim().nonempty({ message: 'Last name is required.' }),
    country: z.string().trim().nonempty({ message: 'Country is required.' }),
    city: z.string().trim().nonempty({ message: 'City is required.' }),
    postCode: z.string().trim().nonempty({ message: 'Post code is required.' }),
    street: z.string().trim().nonempty({ message: 'Street is required.' }),
    houseNumber: z.string().trim().nonempty({ message: 'House number is required.' }),
    password: z
      .string()
      .trim()
      .nonempty({ message: 'Password is required.' })
      .min(6, { message: 'Use 6 or more characters.' }),
    confirmPassword: z.string().trim().nonempty({ message: 'Password confirmation is required.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const updateFormSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: 'This field is required.' })
    .email({ message: 'Invalid email address.' }),
  firstName: z.string().trim().nonempty({ message: 'First name is required.' }),
  lastName: z.string().trim().nonempty({ message: 'Last name is required.' }),
  country: z.string().trim().nonempty({ message: 'Country is required.' }),
  city: z.string().trim().nonempty({ message: 'City is required.' }),
  postCode: z.string().trim().nonempty({ message: 'Post code is required.' }),
  street: z.string().trim().nonempty({ message: 'Street is required.' }),
  houseNumber: z.string().trim().nonempty({ message: 'House number is required.' }),
});

export const changePasswordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .nonempty({ message: 'This field is required.' })
      .min(6, { message: 'Use 6 or more characters.' }),
    newPassword: z
      .string()
      .trim()
      .nonempty({ message: 'This field is required.' })
      .min(6, { message: 'Use 6 or more characters.' }),
    confirmPassword: z.string().trim().nonempty({ message: 'This field is required.' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
