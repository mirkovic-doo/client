import { type NotificationResponse, NotificationType } from '$lib/api/apiNotification';
import api from '$lib/auth/http';
import type { BIENotification } from '$lib/types/notification';

export const mapNotificationResponseToNotification = async (
  response: NotificationResponse
): Promise<BIENotification> => {
  return {
    id: response.id,
    senderId: response.senderId,
    type: mapNotificationTypeToNotificationType(response.type),
    isRead: response.isRead,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
    entityId: response.entityId,
    receiverId: response.receiverId,
    reciever: response.receiverId ? (await api.userService.user.getById(response.receiverId)).data : null,
    sender: response.senderId ? (await api.userService.user.getById(response.senderId)).data : null,
  } as BIENotification;
};

const mapNotificationTypeToNotificationType = (type: any): NotificationType => {
  switch (type) {
    case 1:
      return NotificationType.ReservationRequest;
    case 2:
      return NotificationType.ReservationResponse;
    case 3:
      return NotificationType.ReservationCancellation;
    case 4:
      return NotificationType.ReviewRecieved;
    default:
      return type;
  }
};
