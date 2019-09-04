class BaseTemplate
{
	#apiUrl = 'http://api.portfolio.docker'

	constructor() {
	    if (new.target === BaseTemplate) {
	    	throw new TypeError('BaseTemplate class cannot be instantiated');
	    }
		if (this.render === undefined) {
			throw new TypeError('Render method must be defined');
		}
	}
	async getData(path) {
		let response = await fetch(this.#apiUrl + path)
		return await response.json()
	}
	async getProfile() {
		let responseData = await this.getData('/profiles?name=Mesh')
		return responseData.profiles[0]
	}
}

export default BaseTemplate
