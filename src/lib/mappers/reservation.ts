import type { ReservationResponse } from '$lib/api/apiAccommodation';
import { ReservationStatus } from '$lib/api/apiAccommodation';
import type { Reservation } from '$lib/types/reservation';

export const mapReservationResponseToReservation = (reservation: ReservationResponse): Reservation => {
  return {
    id: reservation.id || '',
    startDate: reservation.startDate || '',
    endDate: reservation.endDate || '',
    guests: reservation.guests || 0,
    status: reservation.status || ReservationStatus.Pending,
    price: reservation.price || 0,
    propertyId: reservation.propertyId || '',
    propertyName: reservation.propertyName || '',
    createdById: reservation.createdById || '',
    createdAt: reservation.createdAt || '',
  };
};
