/* eslint-disable no-extra-parens */

import {
  Api as AccommodationServiceApi,
  type ApiConfig as AccommodationServiceConfig,
  type RequestParams as AccommodationServiceRequestParams,
} from '$lib/api/apiAccommodation';
import {
  Api as NotificationServiceApi,
  type ApiConfig as NotificationServiceConfig,
  type RequestParams as NotificationServiceRequestParams,
} from '$lib/api/apiNotification';
import {
  Api as ReviewServiceApi,
  type ApiConfig as ReviewServiceConfig,
  type RequestParams as ReviewServiceRequestParams,
} from '$lib/api/apiReview';
import {
  Api as UserServiceApi,
  type ApiConfig as UserServiceConfig,
  type RequestParams as UserServiceRequestParams,
} from '$lib/api/apiUser';
import { get } from 'svelte/store';

import authStore from '$lib/stores/authStore';
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

const apiNotificationServiceConfig: NotificationServiceConfig = {
  baseUrl: env.notificationServiceBaseUrl,
  baseApiParams: {
    secure: true,
  },
  securityWorker: async (): Promise<NotificationServiceRequestParams> => {
    const { isLoggedIn, user } = get(authStore);
    const requestParams: NotificationServiceRequestParams = {};

    if (isLoggedIn && user) {
      requestParams.headers = {
        ...requestParams.headers,
        Authorization: `Bearer ${await user.getIdToken()}`,
      };
    }

    return requestParams;
  },
};

const apiAccommodationServiceConfig: AccommodationServiceConfig = {
  baseUrl: env.accommodationServiceBaseUrl,
  baseApiParams: {
    secure: true,
  },
  securityWorker: async (): Promise<AccommodationServiceRequestParams> => {
    const { isLoggedIn, user } = get(authStore);
    const requestParams: AccommodationServiceRequestParams = {};

    if (isLoggedIn && user) {
      requestParams.headers = {
        ...requestParams.headers,
        Authorization: `Bearer ${await user.getIdToken()}`,
      };
    }

    return requestParams;
  },
};

const apiReviewServiceConfig: ReviewServiceConfig = {
  baseUrl: env.reviewServiceBaseUrl,
  baseApiParams: {
    secure: true,
  },
  securityWorker: async (): Promise<ReviewServiceRequestParams> => {
    const { isLoggedIn, user } = get(authStore);
    const requestParams: ReviewServiceRequestParams = {};

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
  notificationService: new NotificationServiceApi(apiNotificationServiceConfig),
  accommodationService: new AccommodationServiceApi(apiAccommodationServiceConfig),
  reviewService: new ReviewServiceApi(apiReviewServiceConfig),
};

export default api;
