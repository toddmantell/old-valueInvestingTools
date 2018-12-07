require('isomorphic-fetch');

module.exports = getGrahamFormula;

async function getGrahamFormula(ticker, growthRate = 0) {
	try {
		const keyStatsResponse = await fetch(`https://api.iextrading.com/1.0/stock/${ticker}/stats`);

		const { ttmEPS } = await keyStatsResponse.json();
		console.log(`Trailing Twelve Month EPS: ${ttmEPS}`);//this type of data should go in the dashboard (though long-term this should just be a service that returns data)
	
		//ultimately these should be inputs that are input in a screen and then sent or stored as json?
		const grahamFormulaNumber = calculateGrahamFormula({growthRate, ttmEPS, peAssumption: 8.5, growthMultiple: 2});
		const conservativeGrahamFormulaNumber = calculateGrahamFormula({growthRate, ttmEPS, peAssumption: 7, growthMultiple: 1})

		return {grahamFormulaNumber, conservativeGrahamFormulaNumber};
	} catch (error) {
		console.log(error);
	}
}

function calculateGrahamFormula({growthRate, ttmEPS, peAssumption, growthMultiple}) {
	//EPS + (8.5 * 2G) * 4.4 / Y
	//WHERE, G is the expected growth rate, 4.4 is the risk free interest rate and Y is the AAA corporate bond rate of return (currently 4.23%)
	const grahamFormulaNumber = growthRate && (ttmEPS * (peAssumption + (growthMultiple * growthRate)) * 4.4) /4.23;

	return grahamFormulaNumber;
}
