/* eslint-disable no-extra-parens */

import {
  Api as UserServiceApi,
  type ApiConfig as UserServiceConfig,
  type RequestParams as UserServiceRequestParams,
} from '$lib/api/apiUser';
import authStore from '$lib/stores/authStore';
import { get } from 'svelte/store';
import { env } from '../../env';

const apiUserServiceConfig: UserServiceConfig = {
  baseUrl: env.userServiceBaseUrl,
  baseApiParams: {
    secure: true,
  },
  securityWorker: async (): Promise<UserServiceRequestParams> => {
    const { isLoggedIn, user } = get(authStore);
    const requestParams: UserServiceRequestParams = {};

    if (isLoggedIn && user) {
      requestParams.headers = {
        ...requestParams.headers,
        Authorization: `Bearer ${await user.getIdToken()}`,
      };
    }

    return requestParams;
  },
};

const api = {
  userService: new UserServiceApi(apiUserServiceConfig),
};

export default api;
