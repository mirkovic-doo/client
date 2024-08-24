import type { UserResponse } from '$lib/api/apiUser';
import type { UpdateUserForm, User } from '$lib/types/user';

export const mapUserResponseToUser = (user: UserResponse): User => {
  return {
    id: user.id || '',
    email: user.email || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    country: user.country || '',
    city: user.city || '',
    postCode: user.postCode || '',
    street: user.street || '',
    houseNumber: user.houseNumber || '',
    isGuest: user.isGuest ?? false,
  };
};

export const mapUserToUserForm = (user: User): UpdateUserForm => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    country: user.country,
    city: user.city,
    postCode: user.postCode,
    street: user.street,
    houseNumber: user.houseNumber,
  };
};
