const grahamNumber = require('../grahamNumber');
const grahamFormula = require('../grahamFormula');
const getNCAV = require('../getNetCurrentAssetValue');

dashboard(process.argv[2]);

function dashboard(ticker) {
	//ultimately, these functions should just return values and then we output them somewhere else, but that's a future feature
	grahamNumber(ticker);
	// grahamFormula(ticker);
	getNCAV(ticker);
}
