import Axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  // headers: {
  //   Authorization: 'Bearer' + Token,
  // },
});

// adding token from local storage in axios headers
axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('access');
    if (token !== null && token !== '') {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
// const responseInterceptor = instance.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   async error => {
//     const refreshToken = await AsyncStorage.getItem('access');
//     instance.defaults.headers.common['Authorization'] =
//       'Bearer ' + refreshToken;

//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   },
// );
export default axios;
