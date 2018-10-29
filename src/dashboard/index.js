const grahamNumber = require('../grahamNumber');
const getNCAV = require('../getNetCurrentAssetValue');

dashboard(process.argv[2]);

function dashboard(ticker) {
	grahamNumber(ticker);
	getNCAV(ticker);
}
