'use strict'

import Router from './router.js'

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

new Router({
	    '/':             new Home(),
	    '/about':        new About(),
	    '/projects/:id': new ProjectView()
	},
	preLoad,
	postLoad
)
.init()
