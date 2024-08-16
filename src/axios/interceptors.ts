// const logOut = () => {};

// export const useTokenInterceptors = (instance: any) => {
//   instance.interceptors.request.use(
//     async (config: any) => {
//       return config;
//     },
//     (error: any) => Promise.reject(error)
//   );

//   instance.interceptors.response.use(
//     (response: any) => response,
//     async (error: any) => {
//       //We should fix backend to return proper message and replace this with error.message === constant
//       if (error.response.status === 401) {
//         logOut();
//       }
//       return Promise.reject(error);
//     }
//   );
// };
