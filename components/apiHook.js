import useSWR from 'swr';
import { fetcherWithToken } from './fetcherFtns.js';

const apiHook = (url, params) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${url}`;
  const token = '24|Hr4x2kc2MCh3sR9kAEH9ZRJOPSLN120Vqm20dwHU';

  const fetcherParams = {
    method: 'GET',
    params: params,
    token: token
  };
  console.log('URL', apiUrl);

  return useSWR([apiUrl, fetcherParams], fetcherWithToken);
}

export default apiHook;
