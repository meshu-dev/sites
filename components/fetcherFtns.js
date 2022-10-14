export const fetcher = (url, params) => fetch(url, {
  method: params['method'],
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(params['body'])
}).then((res) => res.json());

/*
export const fetcherWithToken = (url, params) => fetch(url, {
  method: params['method'],
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${params['token']}`
  },
  body: JSON.stringify(params['body'])
}).then((res) => res.json()); */

export const fetcherWithToken = async (url, params) => {
  const fetchParams = {
    method: params['method'],
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${params['token']}`
    },
    body: JSON.stringify(params['body'])
  };

  const response = await fetch(url, fetchParams);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await response.json();
    error.status = response.status;

    throw error;
  }
  const result = await response.json();
  
  return await result;
}
