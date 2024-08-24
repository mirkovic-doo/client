import type { NotificationType } from '$lib/api/apiNotification';
import type { UserResponse } from '$lib/api/apiUser';

export interface BIENotification {
  id: string;
  senderId: string;
  sender: UserResponse;
  receiverId: string;
  reciever: UserResponse;
  entityId: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
