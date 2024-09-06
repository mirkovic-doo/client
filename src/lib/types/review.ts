import type { ReviewType } from '$lib/api/apiReview';
import type { User } from './user';

export interface Review {
  id: string;
  reservationId: string;
  revieweeId: string;
  type: ReviewType;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  updatedById: string;
  createdBy: User;
}
