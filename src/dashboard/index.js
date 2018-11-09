const grahamNumber = require('../grahamNumber');
const grahamFormula = require('../grahamFormula');
const getNCAV = require('../getNetCurrentAssetValue');

const [,,ticker, growthRate] = process.argv;

dashboard(ticker, growthRate);

function dashboard(ticker, growthRate) {
	console.log('Ticker');
	console.log('Price');
	console.log('TTM EPS');
	console.log('Graham Number');
	console.log('Graham Formula PE');
	console.log('Graham Formula Valuation');
	//ultimately, these functions should just return values and then we output them somewhere else, but that's a future feature
	grahamNumber(ticker);
	// grahamFormula(ticker);
	getNCAV(ticker);
	grahamFormula(ticker, growthRate);
}
