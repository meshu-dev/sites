'use strict'

import Router from './router.js'

import Auth        from './templates/auth.js'
import Home        from './templates/home.js'

let preLoad = () => {
	document.getElementById('layout').style.display = 'none'
	document.getElementById('loader').style.display = 'block'
}

let postLoad = (pageContent) => {
	document.getElementsByTagName('main')[0].innerHTML = pageContent

	document.getElementById('loader').style.display = 'none'
	document.getElementById('layout').style.display = 'block'
}

let getTokenData = () => {
	let token = window.localStorage.getItem('token'),
		base64Url = token.split('.')[1],
		jsonStr = window.atob(base64Url);

	return JSON.parse(jsonStr);
}

let isTokenExpired = () => {
	let tokenData = getTokenData();

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

let authCheck = (auth) => {
	let token = window.localStorage.getItem('token'),
		pageUrl = null;

	if (token && isTokenExpired() === true) {
		auth.logout();
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

(async() => {
	let response = await fetch('/data.json')
	let siteData = await response.json()
	let apiUrl = siteData['apiUrl']

	let auth = new Auth(apiUrl);
	window.auth = auth;

	let router = new Router({
			'/login': auth,
		    '/': new Home(apiUrl)
		},
		preLoad,
		postLoad
	)
	let pageUrl = authCheck(auth);

	if (!pageUrl) {
		pageUrl = window.location.href;
	}

	console.log('pageUrl', pageUrl);

    if (document.readyState === 'complete') {
        router.goToPage(pageUrl);
    } else {
    	window.addEventListener('load', router.goToPage(pageUrl));
    }
})()
