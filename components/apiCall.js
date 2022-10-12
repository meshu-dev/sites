import useSWR from 'swr';
import { fetcherWithToken } from './fetcherFtns.js';

const apiCall = (method, url) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${url}`;
  const token = '24|Hr4x2kc2MCh3sR9kAEH9ZRJOPSLN120Vqm20dwHU';

  return useSWR([method, apiUrl, token], fetcherWithToken);
}

export const apiGet = (url) => {
  return apiCall('GET', url);
}

export const apiPost = (url) => {
  return apiCall('POST', url);
}
