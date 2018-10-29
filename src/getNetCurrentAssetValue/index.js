const getCompanyFinancials = require('../getCompanyFinancials');
const convertToFixed = require('../utils/convertToFixed');

// getNetCurrentAssetValue(process.argv[2]);

async function getNetCurrentAssetValue(ticker) {
	const companyFinancials = await getCompanyFinancials(ticker);
	const ncav = calculateNetCurrentAssets(companyFinancials);
	const ncavWithTwoDecimals = convertToFixed(ncav);
	
	if (ncav) console.log(`${ticker} Net Current Asset Value: $${ncavWithTwoDecimals}`);
	else console.log('net current asset value is not a positive figure');

	const priceResponse = await fetch(`https://api.iextrading.com/1.0/stock/${ticker}/price`);
	const price = await priceResponse.json();
	console.log(`${ticker} current price: $${convertToFixed(price)}`);

	//rename this, it's not technically the percent of price, it's a decimal figure
	const percentOfPrice = price/ncav;

	if (percentOfPrice) console.log(`${ticker} is selling for ${convertFloatToPercent(percentOfPrice)}% of $${ncavWithTwoDecimals}`)
}

function convertFloatToPercent(float) {
	const convertedToPercentage = Number.parseFloat(float).toFixed(2) * 100;
	return convertedToPercentage || 'NMF';
}

function calculateNetCurrentAssets(companyFinancials) {
	const {
		cashcashequivalentsandshortterminvestments = 0,
		commonstock = 0,
		inventoriesnet = 0,
		totalliabilities = 0,
		totalreceivablesnet = 0,
	} = companyFinancials;

	// console.log({
	// 	cashcashequivalentsandshortterminvestments,
	// 	commonstock,
	// 	inventoriesnet,
	// 	totalliabilities,
	// 	totalreceivablesnet,
	// });

	const currentAssetsForCalculation = totalreceivablesnet + inventoriesnet + cashcashequivalentsandshortterminvestments;
	const netCurrentAssets = currentAssetsForCalculation - totalliabilities;
	const ncav = netCurrentAssets / (commonstock * 1000);

	// console.log({
	// 	currentAssetsForCalculation,
	// 	netCurrentAssets,
	// 	commonstock
	// });

	return ncav;
}

module.exports = getNetCurrentAssetValue;
