'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var subNavbar = new mongoose.Schema({
    subMenu: { type: String, default: ""}
})

var NavbarSchema = new mongoose.Schema({
    idNode: { type: Number, default: null},
    parentNode: { type: String, default: ""},
    subList:[subNavbar]
});

//export our module to use in server.js
module.exports = mongoose.model('navbarcategories', NavbarSchema);