import { ReservationStatus } from '$lib/api/apiAccommodation';

export const PREFERRED_DARK_MEDIA_THEME = '(prefers-color-scheme: dark)';

export const ROUTES = {
  GUEST: {
    HOME: '/guest/',
  },
  HOST: {
    HOME: '/host/',
  },
  LOGIN: '/login/',
};

export const SendNotificationMethodName = 'SendNotification';
export const NotificationHubRoute = '/notificationHub';

export const reservationStatusMessages: Record<ReservationStatus, string> = {
  [ReservationStatus.Pending]: 'Pending...',
  [ReservationStatus.Confirmed]: 'Confirmed',
  [ReservationStatus.GuestCancelled]: 'Cancelled by guest',
  [ReservationStatus.HostCancelled]: 'Cancelled by host',
};
