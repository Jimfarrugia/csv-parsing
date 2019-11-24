const fs = require('fs');
const csv = require('csv-parser');
const colors = require('colors');

const connection = require('../connect');

/*
		Create 'Product Variant' entries with data parsed from csv file.
*/
const importProductVariants = async (csvPath) => {
	// This array will hold row data
	const productVariantsData = [];

	// Read the CSV file
	fs.createReadStream(csvPath)
		.pipe(csv())
		.on('data', (row) => {
			// store row data as items in array
			productVariantsData.push(row);
		})
		.on('end', () => {
			// confirm done and display count
			console.log(`Parsed ${productVariantsData.length} rows of products.`.green);
		});

	await connection
		.then(environment => {
			console.log(`Connected to Contentful ${environment.name} environment.`);

			// Create an entry for each item in array
			productVariantsData.forEach(async item => {
				await environment
					.createEntry("productVariant", {
						fields: {
							code: {
								"en-GB": +item.code // integer
							},
							name: {
								"en-GB": item.name
							},
							descriptor: {
								"en-GB": [item.descriptor]
							},
							description: {
								"en-GB": item.description
							},
							length: {
								"en-GB": +item.length // integer
							},
							width: {
								"en-GB": +item.width // integer
							},
							thickness: {
								"en-GB": +item.thickness // float
							},
							edgeColor: {
								"en-GB": [item.edge_color]
							},
							surfaceTexture: {
								"en-GB": [item.surface_texture]
							},
							finish: {
								"en-GB": [item.finish]
							},
							grooveSpacing: {
								"en-GB": +item.groove_spacing
							},
							jointCentres: {
								"en-GB": +item.joint_centres
							},
							studSpacing: {
								"en-GB": +item.stud_spacing
							},
							effectiveCoverPerPiece: {
								"en-GB": +item.effective_cover_per_piece
							},
							effectiveCover: {
								"en-GB": +item.effective_cover
							},
							effectiveWidthCover: {
								"en-GB": +item.effectiveWidthCover
							},
							rollCoveragePack: {
								"en-GB": +item.roll_coverage_pack
							},
							linesMetersPerPack: {
								"en-GB": +item.lines_meters_per_pack
							},
							mass: {
								"en-GB": +item.mass
							},
							weightPerUnit: {
								"en-GB": +item.weight_per_unit
							},
							packWeight: {
								"en-GB": +item.pack_weight
							},
							piecesPerPack: {
								"en-GB": +item.pieces_per_pack
							},
							materialRValue: {
								"en-GB": +item.material_r_value
							}
						}
					})
					.then(entry => console.log(`[success] `.green + `Added product variant: ${entry.fields.name["en-GB"]}`))
					.catch(console.error);
			});

		})
		.catch(console.error);
}

module.exports = importProductVariants;