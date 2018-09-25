'use strict';
//import dependency
var mongoose = require('mongoose');
//var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;
//var connection = mongoose.createConnection("mongodb://localhost:27017/BKDB");
//autoIncrement.initialize(connection);

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var subNavbar = new Schema({
    subMenu: { type: String, default: ""}
})
var file = new Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },
    originalname: {
        type: String,
        required: true
    }

});
var EventDetailSchema = new Schema({
    id_Post: { type: Number, default: null},
    category: { type: String, default: ""},
    sub_category: { type: String, default: ""},
    title: { type: String, default: ""},
    description: { type: String, default: ""},
    content: { type: String, default: null},
    file: {type: String},
    startdate: {type:String},
    enddate: {type:String},
    poster: { type: String, default: ""},
    tag: { type: String, default: ""},
    date: { type: Date, default: Date.now},
});

//export our module to use in server.js
//EventDetailSchema.plugin(autoIncrement.plugin, 'eventlists');
module.exports = mongoose.model('eventlists', EventDetailSchema);