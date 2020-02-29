import BaseTemplate from './base.js'

class Home extends BaseTemplate
{
	async getEnvironments() {
		let response = await fetch(
			this.getApiUrl() + '/environments',
			{
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${localStorage.token}`,
					'Content-Type': 'application/json'
				}
			}
		);
		let data = await response.json();

		if (data['hydra:member']) {
			return data['hydra:member'];
		}
		return null;
	}
	async getSites() {
		let response = await fetch(
			this.getApiUrl() + '/sites',
			{
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${localStorage.token}`,
					'Content-Type': 'application/json'
				}
			}
		);
		let data = await response.json();

		if (data['hydra:member']) {
			return data['hydra:member'];
		}
		return null;
	}
	async getSitesByEnvironment() {
		let sites = await this.getSites(),
			sitesByEnv = [];

		if (sites) {
			for (let site of sites) {
				let envUrl = site['environment'];

				if (!sitesByEnv[envUrl]) {
					sitesByEnv[envUrl] = [];
				}
				sitesByEnv[envUrl].push(site);
			}

			let environments = await this.getEnvironments();

			if (environments) {
				let envsWithSites = [];

				for (let environment of environments) {
					if (sitesByEnv[`/environments/${environment['id']}`]) {
						let sites = sitesByEnv[`/environments/${environment['id']}`];

						console.log('sitesByEnv', sitesByEnv);
						console.log('sites', sites);
						console.log('E ID', `environments/${environment['id']}`);

						envsWithSites.push({
							environment: environment,
							sites: sites
						});
					}
				}
				return envsWithSites;
			}
		}
		return null;
	}
	async getEnvironmentsHtml() {
		let envsWithSites = await this.getSitesByEnvironment();

		console.log('envsWithSites', envsWithSites);

		if (envsWithSites) {
			let html = '';

			for (let envsWithSite of envsWithSites) {
				let environment = envsWithSite['environment'],
					sites = envsWithSite['sites'],
					sitesHtml = this.getSitesHtml(sites);

				console.log('envsWithSites', envsWithSites);
				console.log('sites', sites);

				html += `
		    		<section>
		    			<h2>${environment['name']}</h2>
		    			<div>${sitesHtml}</div>
		    		</section>
				`;
			}
			return html;
		}
		return `<div>No environments available</div>`;
	}
	getSitesHtml(sites) {
		if (sites) {
			let html = '';

			for (let site of sites) {
				html += `
		    		<div class='site-row'>
		    			<h3>${site['name']}</h3>
		    			<a href="${site['url']}" target="_blank">${site['url']}</a>
		    		</div>
				`;
			}
			return html;
		}
		return '';
	}
	async render() {
		let environmentsHtml = await this.getEnvironmentsHtml();

	    return `
	    	<div>
	    		<h1>Dev sites</h1>
	    		<div>${environmentsHtml}</div>
	    	</div>
	    `
	}
}

export default Home
