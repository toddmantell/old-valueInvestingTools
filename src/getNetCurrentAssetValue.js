const getCompanyFinancials = require('./getCompanyFinancials');

async function getNetCurrentAssetValue(ticker) {
	const companyFinancials = await getCompanyFinancials(ticker);
	const ncav = calculateNetCurrentAssets(companyFinancials);
	
	if (ncav) console.log(`${ticker} Net Current Asset Value: ${ncav}`);
	else console.log('net current asset value is not a positive figure');

	const priceResponse = await fetch(`https://api.iextrading.com/1.0/stock/${ticker}/price`);
	const price = await priceResponse.json();
	console.log({price});

	if (+price/ncav) console.log(`${ticker} is selling for ${(Number.parseFloat(price/ncav).toFixed(2) * 100)}% of ${ncav}`)
}

function calculateNetCurrentAssets(companyFinancials) {
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

	console.log({
		currentAssetsForCalculation,
		netCurrentAssets,
		commonstock
	});

	return ncav;
}

module.exports = getNetCurrentAssetValue;
