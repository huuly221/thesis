'use strict';
//import dependency
var mongoose = require('mongoose');
//var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var DocumentFileSchema = new Schema({
    filename: {type: String},
    file: {type: String},
    date: {type: Date, default: Date.now},
    poster: { type: String},
	category: {type: String}
});

//export our module to use in server.js
//EventDetailSchema.plugin(autoIncrement.plugin, 'eventlists');
module.exports = mongoose.model('documentfiles', DocumentFileSchema);