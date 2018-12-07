const grahamNumber = require('../grahamNumber');
const grahamFormula = require('../grahamFormula');
const getNCAV = require('../getNetCurrentAssetValue');

const [,,ticker, growthRate] = process.argv;

dashboard(ticker, growthRate);

async function dashboard(ticker, growthRate) {
	console.log('Ticker:', ticker);
	
	const {price, bookValuePerShare, convertedGrahamNumber} = await grahamNumber(ticker);
	console.log(`Price: $${price}`);
	console.log(`Book Value Per Share: $${bookValuePerShare}`);		
	console.log(`Graham Number: $${convertedGrahamNumber}`);
	// grahamFormula(ticker);
	await getNCAV(ticker);
	const {grahamFormulaNumber, conservativeGrahamFormulaNumber} = await grahamFormula(ticker, growthRate);
	console.log(`Graham Formula Result: ${grahamFormulaNumber || 'no growth rate provided'}`);
	console.log(`Conservative Graham Formula Result: ${conservativeGrahamFormulaNumber || 'no growth rate provided'}`);
}
