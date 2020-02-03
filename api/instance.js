import axios from 'axios';
import {AsyncStorage} from 'react-native';

// const baseURL = 'https://test.api.fable.zaya.in';
// // const baseURL = 'https://test.api.observe.zaya.in/v1';
// // let token = "bcf345d20cbf13d5ab6fe67cf44f58e1745107b5";

// // retrieveToken = async () => {
// //   try {
// //     const token = await AsyncStorage.getItem('ACCESS_TOKEN');
// //     return token;
// //   } catch (error) {
// //     console.log('token not found');
// //     return null;
// //   }
// // };
// const headers = {
//   Accept: 'application/json',
//   'Content-Type': 'application/json',
// };

// const instance = axios.create({
//   baseURL: baseURL,
//   timeout: 10000,
//   headers: headers,
// });

// // let token = retrieveToken();

// // if (token !== null) {
// //   console.log(token);
// //   // instance.defaults.headers = {
// //   //   Authorization: 'Token ' + token,
// //   // };
// //   instance.defaults.headers.common['Authorization'] = `Token ${token}`;
// // }

// instance.interceptors.request.use(async function(config) {
//   const token = await AsyncStorage.getItem('ACCESS_TOKEN');
//   config.headers.Authorization = token ? `Token ${token}` : '';
//   return config;
// });

const baseURL = 'https://test.api.fable.zaya.in';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const Axios = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: headers,
});

Axios.interceptors.request.use(async function(config) {
  const token = await AsyncStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = token ? `Token ${token}` : '';
  return config;
});

export default Axios;
