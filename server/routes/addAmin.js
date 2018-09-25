'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var Admin = new Schema({
    display_name: { type : String , default: null},
    admin_name:{type : String , default: null},
    password:{type: String, default: null},
    email: { type : String , default: null},
    is_admin :{type: Boolean, default: true},
    phone: { type : String , default: null},
    token: { type : String , default: null},
    active: {type: Boolean, default: false},
    is_root  :{type: Boolean, default: false},
    activeCode: { type : String , default: Date.now,},
    createdAt: {type: Date, default: Date.now},
    
  
});

//export our module to use in server.js
module.exports = mongoose.model('admins', Admin);
