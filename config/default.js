var env = process.env.NODE_ENV || 'development' // set environment
require('dotenv').config({ path: `.env/${env}.env`}) // set .env variables
var config = require(`./environments/${env}`); 

module.exports = config;
