export const fetcher = (method, url) => fetch(url, {
  method: method,
  headers: {
    'Content-Type': 'application/json'
  }
}).then((res) => res.json());

export const fetcherWithToken = (method, url, token) => fetch(url, {
  method: method,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}).then((res) => res.json());
