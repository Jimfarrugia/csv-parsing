const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('sample_data.csv')
	.pipe(csv())
	.on('data', (row) => {
		// This data event will fire whenever a row has been processed
		console.log(row);
	})
	.on('end', () => {
		console.log('CSV file successfully processed');
	});
