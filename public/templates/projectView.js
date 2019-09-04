import BaseTemplate from './base.js'

class ProjectView extends BaseTemplate
{
    async render() {
    	let blogId = window.location.pathname.replace('/projects/', ''),
    		responseData = await this.getData('/projects/' + blogId),
    		project = responseData.project[0]

	    return `
	    	<div id="page-header">
		    	<h1>Project VIEW</h1>
		    	<a href="/" id="back-button" class="button">
	                <div id="logo">Home</div>
	            </a>
	            <div>${project.description}</div>
            </div>
	    `
    } 
}

export default ProjectView
