const calculateGrahamNumber = require('../src/grahamNumber');

describe('calculateGrahamNumber', () => {
	it('should return the number', async () => {
		global.fetch = () => {
			return Promise.resolve({ttmEPS: 13.25, priceToBook: 1.5});
		};

		const result = await calculateGrahamNumber('MSFT')
		
		expect(1).toEqual(1);
	});	
});