'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var Admin = new Schema({
    event: { type : String , default: null},
    full_name: { type : String , default: null},
    mssv: { type : String , default: null},
    email: { type : String , default: null},
    phone: { type : String , default: null},
    startdate: {type:String},
    enddate: {type:String},
    regiterAt: {type: Date, default: Date.now},
  
});

//export our module to use in server.js
module.exports = mongoose.model('admins', Admin);
