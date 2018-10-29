require('isomorphic-fetch');
const convertToFixed = require('../utils/convertToFixed');

const calculateBookPerShare = (price, priceToBook) => price/priceToBook;

// grahamNumber(process.argv[2]);

async function grahamNumber(ticker) {
	try {
		const keyStatsResponse = await fetch(`https://api.iextrading.com/1.0/stock/${ticker}/stats`);
		const priceResponse = await fetch(`https://api.iextrading.com/1.0/stock/${ticker}/price`);
		const {ttmEPS, priceToBook} = await keyStatsResponse.json();
		const price = await priceResponse.json();
				
		const bookValuePerShare = convertToFixed(calculateBookPerShare(price, priceToBook));
		const calculatedGrahamNumber = Math.sqrt(22.5 * bookValuePerShare * ttmEPS);
	
		console.log(`Ticker: ${ticker}`);
		console.log(`Price: $${price}`);
		console.log(`Book Value Per Share: $${bookValuePerShare}`);		
		console.log(`Graham Number: $${convertToFixed(calculatedGrahamNumber)}`);
	} catch (error) {
		console.log({error});
	}
}


module.exports = grahamNumber;
