'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var Userevent = new Schema({
    code_event: { type : String , default: null},
    title: { type : String , default: null},
    full_name: { type : String , default: null},
    mssv: { type : String , default: null},
    email: { type : String , default: null},
    phone: { type : String , default: null},
    startDate: {type:Date},
    endDate: {type:Date},
    regiterAt: {type: Date, default: Date.now},
  
});

//export our module to use in server.js
module.exports = mongoose.model('userevents', Userevent);
