const secrets = require('../secrets.json')
require('es6-promise').polyfill();
require('isomorphic-fetch');

async function getCompanyFinancials(tickerSymbol) {
	const apiURL = secrets.FINANCIALS_API + tickerSymbol + '&appkey=' + secrets.API_KEY;
	
	try {
		const response = await fetch(apiURL);
		const companyData = await response.json();

		let companyFinancials = {};
	
		companyData.result.rows[0].values.sort(sortArrayItemsByField).map(kvPair => companyFinancials[kvPair.field] = kvPair.value);

		return companyFinancials;
	} catch (error) {
		console.log(error);
	}
}

function sortArrayItemsByField(a, b) {
	var nameA = a.field.toUpperCase(); // ignore upper and lowercase
	var nameB = b.field.toUpperCase(); // ignore upper and lowercase
	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}

	// names must be equal
	return 0;
}

module.exports = getCompanyFinancials;
