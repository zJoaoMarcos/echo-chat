import axios, { isAxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

import { logout } from "@/contexts/auth";
import { cookieValues } from "@/constants/cookie-values";

const isServer = typeof window === "undefined";

export const api = axios.create({
  baseURL: "http://localhost:3001/",
});

api.interceptors.request.use(async (config) => {
  const headers = config.headers ?? {};

  if (isServer) {
    const { cookies } = await import("next/headers"),
    accessToken = cookies().get(cookieValues.accessToken)?.value;

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
  } else {
    const { [cookieValues.accessToken]: accessToken } = parseCookies();

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }

  return config;
});

type FailedRequestQueue = {
  onSuccess: (newToken: string) => void;
  onFailure: () => void;
};

let isRefreshing = false;
let failedRequestsQueue: FailedRequestQueue[] = [];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data.message;

      if (status === 401 && message === "Token expired.") {
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;
          
          // TODO: implement-me 
          /* api
            .patch(REFRESH_TOKEN)
            .then((response) => {
              const { accessToken } = response.data;

              setCookie(undefined, cookieValues.accessToken, accessToken, {
                path: "/",
                maxAge: 60 * 60 * 1 * 24, // 24 hours
              });

              failedRequestsQueue.forEach((request) =>
                request.onSuccess(accessToken)
              );
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.onFailure());

              logout();
            })
            .finally(() => {
              failedRequestsQueue = [];

              isRefreshing = false;
            }); */
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (accessToken: string) => {
              if (originalConfig) {
                originalConfig.headers[
                  "Authorization"
                ] = `Bearer ${accessToken}`;

                resolve(api(originalConfig));
              }
            },
            onFailure: () => {
              reject(error);
            },
          });
        });
      } else if (status === 401) {
        logout();
      } else {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);