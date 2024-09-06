import { get } from 'svelte/store';

import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

import authStore from '$lib/stores/authStore';
import { env } from '$src/env';
import { NotificationHubRoute } from './constants';

interface HubAccessInput {
  token: string;
}

const getAccessInput = async (): Promise<string> => {
  const jwt = (await get(authStore).user?.getIdToken()) ?? '';
  return JSON.stringify({
    token: jwt,
  } as HubAccessInput);
};

export const createFileUploadHubConnection = (): HubConnection => {
  const connection = new HubConnectionBuilder()
    .withUrl(`${env.notificationServiceBaseUrl}${NotificationHubRoute}`, {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
      accessTokenFactory: () => getAccessInput(),
      withCredentials: true,
    })
    .withAutomaticReconnect()
    .build();

  connection.start().catch((err) => console.log(err.toString()));

  return connection;
};
