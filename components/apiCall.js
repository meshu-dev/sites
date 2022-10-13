const apiRequest = async (method, url, params) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${url}`;
  const token = '24|Hr4x2kc2MCh3sR9kAEH9ZRJOPSLN120Vqm20dwHU';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const fetchParams = {
    method,
    headers
  };

  if (params) {
    fetchParams['body'] = JSON.stringify(params);
  }

  let response = await fetch(apiUrl, fetchParams);
  response = await response.json();

  return response;
};

export const apiGet = async (url) => {
  return await apiRequest('GET', url, null);
}

export const apiPost = async (url, params) => {
  return await apiRequest('POST', url, params);
}

export const apiPut = async (url, params) => {
  return await apiRequest('PUT', url, params);
}

export const apiDelete = async (url, params) => {
  return await apiRequest('DELETE', url, params);
}
