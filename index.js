require('dotenv').config();

// CSV files
const importProductAccessories = require('./contentful/importers/productAccessories');
const importProductVariants = require('./contentful/importers/productVariants');

/*
		IMPORT DATA TO CONTENTFUL
*/

// * Product Accessories
importProductAccessories('./csv/product_accessory.csv');

// * Product Variants
// importProductVariants('./csv/product.csv');
