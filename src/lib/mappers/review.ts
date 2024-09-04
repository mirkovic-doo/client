import { ReviewType, type ReviewResponse } from '$lib/api/apiReview';
import api from '$lib/auth/http';
import type { Review } from '$lib/types/review';
import { mapUserResponseToUser } from './user';

export const mapReviewResponseToReview = async (response: ReviewResponse): Promise<Review> => {
  return {
    id: response.id || '',
    reservationId: response.reservationId || '',
    revieweeId: response.revieweeId || '',
    type: response.type ?? ReviewType.Host,
    comment: response.comment || '',
    createdAt: response.createdAt || '',
    updatedAt: response.updatedAt || '',
    createdById: response.createdById || '',
    updatedById: response.updatedById || '',
    createdBy: response.createdById
      ? mapUserResponseToUser((await api.userService.user.getById(response.createdById)).data)
      : {
          id: '',
          firstName: 'Unknown',
          email: '',
          lastName: 'User',
          city: '',
          country: '',
          houseNumber: '',
          postCode: '',
          street: '',
          isGuest: false,
        },
    rating: response.rating || 0,
  };
};
