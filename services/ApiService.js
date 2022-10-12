class ApiService {
  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL
  }

  /*
  async get(url, incHeaders = false) {
    return this.request(url, "GET", {}, incHeaders)
  } */

  async post(url, params = {}) {
    let apiUrl =`${this.apiUrl}/${url}`;
  
    const fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    };
  
    let response = await fetch(apiUrl, fetchParams);
    response = await response.json();

    return response;
  }

  /*
  async request(url, method = "GET", fetchData = {}, getHeaders = false) {
    try {
      const response = await fetch(this.apiUrl + url, fetchData)

      if (!response.ok) {
        throw Error(response.statusText)
      }

      const json = await response.json()

      if (getHeaders === true) {
        return {
          headers: this.getHeaders(response),
          data: json,
        }
      } else {
        return json
      }
    } catch (error) {
      //console.log(error);
    }
  }

  getHeaders(response) {
    let headers = {}

    for (let header of response.headers) {
      headers[header[0]] = header[1]
    }
    return headers
  } */
}

export default ApiService
