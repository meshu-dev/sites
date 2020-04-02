'use strict'

import Router from './router.js'

import Auth from './auth.js'
import Login from './templates/login.js'
import Home from './templates/home.js'

let preLoad = () => {
	document.getElementById('layout').style.display = 'none'
	document.getElementById('loader').style.display = 'block'
}

let postLoad = (pageContent) => {
	document.getElementsByTagName('main')[0].innerHTML = pageContent

	document.getElementById('loader').style.display = 'none'
	document.getElementById('layout').style.display = 'block'
}

(async() => {
	let response = await fetch('/data.json')
	let siteData = await response.json()
	let apiUrl = siteData['apiUrl']

	let auth = new Auth();

	let login = new Login(apiUrl);
	window.login = login;

	let router = new Router({
			'/login': login,
		    '/': new Home(apiUrl)
		},
		preLoad,
		postLoad
	)
	let pageUrl = auth.verify();

	if (!pageUrl) {
		pageUrl = window.location.href;
	}

	let loginLink = document.getElementById('logout-link');
	loginLink.onclick = function() {
		auth.logout();
	};

	console.log('pageUrl', pageUrl);

    if (document.readyState === 'complete') {
        router.goToPage(pageUrl);
    } else {
    	window.addEventListener('load', router.goToPage(pageUrl));
    }
})()
