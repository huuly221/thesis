var express = require('express');
var router = express.Router();

var GetNavbar = require('../models/getNavbar');
//http = require('http'),
//formidable = require('formidable'),
//fs = require('fs'),
//path = require('path');
/*router.get('/admin', function(req, res){
  res.render('index')
});
*/



//////////////// Upload File /////////
//const storage = multer.diskStorage({
  //destination: (req, file, cb) => {
    /*
      Files will be saved in the 'uploads' directory. Make
      sure this directory already exists!
    */
   // cb(null, './uploads');
  //},
  //filename: (req, file, cb) => {
    /*
      uuidv4() will generate a random ID that we'll use for the
      new filename. We use path.extname() to get
      the extension from the original file name and add that to the new
      generated ID. These combined will create the file name used
      to save the file on the server and will be available as
      req.file.pathname in the router handler.
    */
    //const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    //cb(null, newFilename);
  //},
//});
// create the multer instance that will be used to upload/save the file
//const upload = multer({ storage });
//////////////// Upload File /////////






router.get('/', function(req, res) {
    res.json({ message: 'API Initialized dfdfdfdfd!'});
  });
  
  
  
  // route lấy data của Menu
  router.route('/navbar')
    //retrieve all comments from the database
    .get(function(req, res) {
      //looks at our Comment Schema
      GetNavbar.find(function(err, navbar) {
        if (err)
          res.send(err);
        //responds with a json object of our database comments.
        res.json(navbar)
        
      });
    })

/*
  router.route('/uploads')
    //retrieve all comments from the database
    .post(upload.single('selectedFile'), (req, res) => {
      
      res.send();
    });
  
  */
  
  
  
   /* .post(function(req, res) {
      var user = new User();
      //body parser lets us use the req.body
      user.mssv = req.body.mssv;
      user.pass = req.body.pass;
  
    
      user.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Comment successfully added!' });
      });
    });*/
  
  
  
  
  
  
  
    
  
module.exports = router;