class Auth
{
	verify() {
		let token = window.localStorage.getItem('token'),
			pageUrl = null;

		if (token && this.isTokenExpired() === true) {
			this.logout();
		}

		if (!token) {
			if (window.location.pathname != '/login') {
				window.location.href = `${window.location.origin}/login`;
			} else {
				document.getElementById('nav-links').style.display = 'none';
				pageUrl = `${window.location.origin}/login`;
			}
		}
		return pageUrl;
	}
	logout() {
        window.localStorage.removeItem('token');
        window.location.href = '/login';
	}
	getTokenData() {
		let token = window.localStorage.getItem('token'),
			base64Url = token.split('.')[1],
			jsonStr = window.atob(base64Url);

		return JSON.parse(jsonStr);
	}
	isTokenExpired() {
		let tokenData = this.getTokenData();

		if (tokenData && tokenData['exp']) {
			let date = new Date(),
				expiryTime = tokenData['exp'] * 1000;

			console.log('isTokenExpired - Expiry time -', new Date(expiryTime), expiryTime);
			console.log('isTokenExpired - Current time -', date, date.getTime());

			if (date.getTime() >= expiryTime) {
				return true;
			}
			return false;
		}
		return null;
	}
}

export default Auth
