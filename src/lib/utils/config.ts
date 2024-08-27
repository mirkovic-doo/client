import { ReservationsColumns } from '$lib/enums/reservation';
import { Column } from '$lib/types/common';

export const ReservationsColumnsConfig: Column[] = [
  {
    name: ReservationsColumns.PROPERTY_NAME,
  },
  {
    name: ReservationsColumns.ARRIVAL_DATE,
  },
  {
    name: ReservationsColumns.DEPARTURE_DATE,
  },
  {
    name: ReservationsColumns.GUESTS,
  },
  {
    name: ReservationsColumns.CONFIRM,
    isGuest: false,
  },
  {
    name: ReservationsColumns.REJECT,
    isGuest: false,
  },
  {
    name: ReservationsColumns.CANCEL,
    isGuest: true,
  },
];
