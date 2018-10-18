require('dotenv').load();
require('es6-promise').polyfill();
require('isomorphic-fetch');

// getCompanyFinancials('CMG');

getNetCurrentAssetValue('ASNS');

async function getCompanyFinancials(tickerSymbol) {
	const url = process.env.FINANCIALS_API + tickerSymbol + '&appkey=' + process.env.API_KEY;
	
	try {
		const response = await fetch(url);
		const companyData = await response.json();

		let companyFinancials = {};
	
		companyData.result.rows[0].values.sort(sortArrayItemsByField).map(kvPair => companyFinancials[kvPair.field] = kvPair.value);
		// console.log(companyFinancials.companyname, companyFinancials);
		// console.log('current ratio', companyFinancials.totalcurrentassets / companyFinancials.totalcurrentliabilities);

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

async function getNetCurrentAssetValue(ticker) {
	const companyFinancials = await getCompanyFinancials(ticker);

	const {
		cashcashequivalentsandshortterminvestments = 0,
		commonstock = 0,
		inventoriesnet = 0,
		totalliabilities = 0,
		totalreceivablesnet = 0,
	} = companyFinancials;

	console.log({
		cashcashequivalentsandshortterminvestments,
		commonstock,
		inventoriesnet,
		totalliabilities,
		totalreceivablesnet,
	});
	
	
	const currentAssetsForCalculation = totalreceivablesnet + inventoriesnet + cashcashequivalentsandshortterminvestments;
	
	const netCurrentAssets = currentAssetsForCalculation - totalliabilities;

	const ncav = netCurrentAssets / (commonstock * 1000);

	console.log({currentAssetsForCalculation});
	console.log({netCurrentAssets});
	console.log(commonstock);
	
	if (ncav) console.log(`${ticker} Net Current Asset Value: ${ncav}`);
	else console.log('net current asset value is not a positive figure');

}