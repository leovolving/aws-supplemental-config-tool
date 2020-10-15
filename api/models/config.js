const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    allPropertiesRequired: Boolean,
    auth0Users: [{type: Map, of: String}], // array of objects - userId and email address
    createdAt: String,
    customerName: String,
    functionName: String,
    lastUpdated: String,
    projectName: String,
    properties: Map,
    readData: Array,
    requiredProperties: [String],
    updatedBy: String,
    writeData: Array
  });
  
  const Config = new mongoose.model('Config', schema);

  module.exports = { Config };
  