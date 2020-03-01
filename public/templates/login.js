import BaseTemplate from './base.js'

// window.login.login("test9@gmail.com", "test1");

class Login extends BaseTemplate
{
	async login(email, password) {
		let response = await fetch(
			this.getApiUrl() + '/login',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			}
		);
		let data = await response.json();

		if (data.token) {
			window.localStorage.setItem('token', data.token);
			window.location.href = '/';
		}
	}
	async logout() {
		window.localStorage.removeItem('token');
		window.location.href = '/login';
	}
	async render() {
	    return `
	    	<form>
	    		<input type="email" name="email" placeholder="Email" required />
	    		<input type="password" name="password" placeholder="Password" required />
	    		<div>
	    			<button>Submit</button>
	    		</div>
	    	</form>
	    `
	}
}

export default Login
