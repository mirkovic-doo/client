/* eslint-disable no-extra-parens */

import {
  Api as UserServiceApi,
  type ApiConfig as UserServiceConfig,
  type RequestParams as UserServiceRequestParams,
} from '$lib/api/apiUser';
import { env } from '../../env';

const apiUserServiceConfig: UserServiceConfig = {
  baseUrl: env.userServiceBaseUrl,
  baseApiParams: {
    secure: true,
  },
  securityWorker: async (): Promise<UserServiceRequestParams> => {
    // const { isLoggedIn, user } = get(authStore);
    // const organizationId = get(currentTenant)?.id ?? 0;
    // const token = get(tokenStore);
    const requestParams: UserServiceRequestParams = {};
    // const impersonateStore = get(adminImpersonateStore);

    // if (isLoggedIn && user) {
    //   requestParams.headers = {
    //     ...requestParams.headers,
    //     Authorization: `Bearer ${await user.getIdToken()}`,
    //     'X-Tenant-Id': organizationId.toString(),
    //     ...(token !== null && {
    //       'X-Token': token,
    //     }),
    //   };
    // } else {
    //   requestParams.headers = {
    //     ...requestParams.headers,
    //     ...(token !== null && {
    //       'X-Token': token,
    //     }),
    //   };
    // }

    // if (impersonateStore.impersonating && impersonateStore.userId) {
    //   requestParams.headers = {
    //     ...requestParams.headers,
    //     'X-Impersonate-Id': impersonateStore.userId,
    //   };
    // }

    return requestParams;
  },
};

const api = {
  userService: new UserServiceApi(apiUserServiceConfig),
};

export default api;
