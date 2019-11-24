const contentful = require("contentful-management");

// initiate connection with access token
const contentfulClient = contentful
	.createClient({ accessToken: process.env.CONTENTFUL_ACCESS_TOKEN });

// connect to space
const contentfulSpace = contentfulClient
	.getSpace(process.env.CONTENTFUL_SPACE_ID);

// connect to environment
const contentfulLibrary = contentfulSpace
	.then(space => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_ID));

module.exports = contentfulLibrary;