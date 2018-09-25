//server.js
'use strict'

//first we import our dependencies...
var express = require('express');

var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');
//var express = require('express');
//var router = express.Router();
var app = express();
/// noi luu ve data base

//and create our instances
var router = require('./server/routes/routes.js');
//var cors = require('cors');

//var Expense = require('../models/expense');
/// Express router Admin 

var Admin = require("./server/routes/admin-routes");

/////


//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;
//db config
//var mongoDB = 'mongodb://dbdoantruong:dbdoantruong1@ds239009.mlab.com:39009/dbbk';
var mongoDB = 'mongodb://localhost:27017/BKDB';

mongoose.connect(mongoDB);
  


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));






//tạo Schema có cấu trúc để insert user

  










//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

/*
app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData.save()
      .then(item => {
          res.send("Name saved to database");
      })
      .catch(err => {
          res.status(400).send("Unable to save to database");
      });
});
*/



/*router.get('/admin', function(req, res){
  res.render('index')
});
*/



/*router.get('/admin', function(req, res){
  res.render('index')
});
*/


/*router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});*/


//Use our router configuration when we call /api

app.use('/api', router);
app.use('/admin', Admin);


// Use path /admin


//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});




/*
var express = require('express');
 var app = express();
 var jsonParser = require('body-parser').json();
var session = require('express-session');
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
 app.set('view engine', 'ejs');
 app.set('views', './views');
app.use(session({
  secret: 'jsdf7389isacuy28',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000*60*60*24}
}))
 app.use(express.static('public'));
 app.listen(3001, () => console.log('Server started'))
 app.get('/', (req, res) => res.render('home'));

 app.post('/signIn', jsonParser, (req, res) => {
   console.log("day la post");
   var {username, password} = req.body;
   if(username === 'nam' && password === '123'){
    req.session.username = username;
     return res.send('DANG_NHAP_THANH_CONG');
   }
   res.send('DANG_NHAP_THAT_BAI');
 });

app.get('/getInfo', (req, res) => {
  console.log("day la get");
  if(req.session.username){
    return res.send(req.session.username);
  }
  res.send('CHUA_DANG_NHAP');
})*/