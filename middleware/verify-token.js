export default async function (context) {
  let token = localStorage.getItem('auth._token.local');

  if (token && token !== 'false') {
  	token = token.replace('Bearer ', '');

  	let payload = token.split('.')[1],
  		tokenData = JSON.parse(atob(payload));

	if (tokenData.exp) {
		let expiryTime = tokenData.exp * 1000,
			currentTime = Date.now();

		if (expiryTime < currentTime) {
			await context.$auth.logout();
		}
	}
  }
}
