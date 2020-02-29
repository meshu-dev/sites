'use strict'

import Router from './router.js'

import Auth        from './templates/auth.js'
import Home        from './templates/home.js'
import About       from './templates/about.js'
import ProjectView from './templates/projectView.js'

let preLoad = () => {
	document.getElementById('layout').style.display = 'none'
	document.getElementById('loader').style.display = 'block'
}

let postLoad = (pageContent) => {
	document.getElementsByTagName('main')[0].innerHTML = pageContent

	document.getElementById('loader').style.display = 'none'
	document.getElementById('layout').style.display = 'block'
}

let authCheck = () => {
	let isLoggedIn = window.localStorage.getItem('token') ? true : false,
		pageUrl = null;

	if (isLoggedIn === false) {
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
			'/login':        auth,
		    '/':             new Home(apiUrl),
		    '/about':        new About(apiUrl),
		    '/projects/:id': new ProjectView(apiUrl)
		},
		preLoad,
		postLoad
	)
	let pageUrl = authCheck();

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
