const fs = require('fs');
const csv = require('csv-parser');
const colors = require('colors');

const connection = require('../connect');

/*
		Create 'Accessories & Tools' entries with data parsed from csv file.
*/
const importProductAccessories = async (csvPath) => {
	// This array will hold row data
	const productAccessoriesData = [];

	// Read the CSV file
	fs.createReadStream(csvPath)
		.pipe(csv())
		.on('data', (row) => {
			// store row data as items in array
			productAccessoriesData.push(row);
		})
		.on('end', () => {
			// confirm done and display count
			console.log(`Parsed ${productAccessoriesData.length} rows of product accessories.`.green);
		});

	// connect to Contentful
	await connection
		.then(environment => {
			console.log(`Connected to Contentful ${environment.name} environment.`);

			// Create an entry for each item in array
			productAccessoriesData.forEach(async item => {
				if (item.id === 1) {
					await environment
						.createEntry("accessoriesTools", {
							fields: {
								code: {
									"en-GB": +item.code // integer
								},
								name: {
									"en-GB": item.name
								},
								descriptor: {
									"en-GB": item.descriptor
								},
								packageQuantity: {
									"en-GB": item.package_quantity
								},
								headline: {
									"en-GB": item.headline
								},
								description: {
									"en-GB": item.description
								},
								seoTitle: {
									"en-GB": item.seo_title
								},
								seoDescription: {
									"en-GB": item.seo_description
								},
								slug: {
									"en-GB": item.slug
								}
							}
						})
						.then(entry => console.log(`[success] `.green + `Added accessory: ${entry.fields.name["en-GB"]}`))
						.catch(console.error);
				}
			});

		})
		.catch(console.error.red);
}

module.exports = importProductAccessories;