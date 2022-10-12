export const fetcher = (url, params) => fetch(url, {
  method: params['method'],
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(params['body'])
}).then((res) => res.json());

export const fetcherWithToken = (url, params) => fetch(url, {
  method: params['method'],
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${params['token']}`
  },
  body: JSON.stringify(params['body'])
}).then((res) => res.json());
