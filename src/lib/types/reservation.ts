import type { ReservationStatus } from '$lib/api/apiAccommodation';

export interface Reservation {
  id: string;
  startDate: string;
  endDate: string;
  guests: number;
  status: ReservationStatus;
  price: number;
  propertyId: string;
  propertyName: string;
  createdById: string;
  cancellationsCount?: number;
  createdAt: string;
}
