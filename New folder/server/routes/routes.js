var express = require('express');
var app = express();
var router = express.Router();
var GetEvent = require('./getEvent');
var GetDocument = require('./getDocument.js');
var User = require('./addUser.js');
var Admin = require('./addAmin.js');
var GetEventDetail = require('../models/getEventDetail.js');
var multer = require('multer');
var fs = require('fs');
var mongoose = require('mongoose'); 
//var formidable = require('formidable');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});
var upload = multer({storage: storage}).any();
app.use(upload);
/*router.get('/admin', function(req, res){
  res.render('index')
});
*/

router.get('/api', function(req, res) {
    res.json({ message: 'API Initialized!'});
  });
  // route lấy data trang BKEvent.js
  router.route('/bkevent')
    //retrieve all comments from the database
    .get(function(req, res) {
      //looks at our Comment Schema
      GetEvent.find(function(err, events) {
        if (err)
          res.send(err);
        //responds with a json object of our database comments.
        res.json(events)
        
      });
    })
  
    router.post('/eventdetail', function (req,res) { 
      
      console.log("category", req.body.category);
      if (req.body.category){
        var event = new GetEventDetail(req.body);
        event.save(function(err) {
          if (err)
            res.send(err);    
        });
       
      } 
     });

     router.post('/fileeventdetail', function(req,res, next){
        console.log("category undefined : ", req.body.category);
        console.log("params : ", req.query._id);
        upload(req,res,function(err){
          if (req.files){
            console.log("grgrgrgrrgrrrrrggggggggggggggg");
            var key = req.files[0].destination + '/'+ req.files[0].originalname;
            if (req.query._id == undefined){
              GetEventDetail.find(function(err, item){
                GetEventDetail.findOneAndUpdate({}, {$set: {file: key}}, {sort: {date: -1}, upsert:true}, function (err, doc) {
                  if (err) {
                    console.log(err);
                  }
                  else {
                    console.log("success");
                    console.log("key update ", key);
                  }
                  console.log("grgrgrgrrgrrrrrggggggggggggggg");
                });
              });
            }
            else {
              console.log("tìm thấy id: ", req.query._id);
              GetEventDetail.find(function(err, item){
                GetEventDetail.findOneAndUpdate({_id: req.query._id}, {$set: {file: key}}, {sort: {date: -1}, upsert:true}, function (err, doc) {
                  if (err) {
                    console.log(err);
                  }
                  else {
                    console.log("key update ", key);
                  }
                  console.log("grgrgrgrrgrrrrrggggggggggggggg");
                });
              });
            }
            
          }
          
        });
       
     })
    

    router.post('/updateeventdetail', function (req,res) { 
      
      console.log("category", req.body);
      var updatedata = req.body;
      if (req.body._id){
        GetEventDetail.update({_id: req.body._id}, updatedata, function(err, item){
          if (err)
          res.send(err);
        res.send('Expense successfully updated!');
       
        }); 
      }
    });

    router.delete('/eventdetail/delete', function(req,res){
      console.log("delete ID: ", req.query._id);
      console.log("delete: ", req.body);
      if (req.query._id){
        GetEventDetail.find({_id: req.query._id}).remove().exec(function(err, expense) {
          if(err)
           res.send(err);
          res.send('Expense successfully deleted!');
        })
      }
      
    });

    router.route('/eventdetail')
    .get(function(req, res) {
      
      if (req.query._id == undefined){
        console.log("params 1", req.query._id);
        GetEventDetail.find({}, null, {sort: {date: -1}},function(err, events) {
          if (err)
            res.send(err);
          res.json(events)
          
        });
      }
      else {
        console.log("params 2", req.query._id);
        GetEventDetail.findOne({_id: req.query._id}, function(err, event) {
          if (err)
            res.send(err);
          res.json(event)
          
        });
      }
      
    })

  router.route('/bkdocument')
    .get(function(req, res) {
      GetDocument.find(function(err, documents) {
        if (err)
          res.send(err);
        res.json(documents)
        
      });
    })
  
  
  //adding the /comments route to our /api router
  router.route('/bkuser')
    //retrieve all comments from the database
   .get(function(req, res) {
      //looks at our Comment Schema
      User.find(function(err, user) { 
        if (err)
          res.send(err);
        //responds with a json object of our database comments.
        const result = user.filter(data => data.active == true);   
          res.json(result)

      });
    })
  
  
    ///kiem tra tu database so voi du lieu nhap
    //post new comment to the database
  
  
    
    .post(function(req, res) {
      let mssv = req.body.mssv;
      let pass = req.body.pass;
      console.log(req.body);
      var redic = false;
      User.find(function(err, user) {
        if (err)
          res.send(err);
        var result = user.filter(data => data.mssv ==mssv &&  data.password == pass); 
       
        if(result.length ==0){
          console.log('dang nhap that bai');
        }
        else{
          User.findOneAndUpdate({
            mssv: mssv,
            password: pass
          }, {
            $set: {active:true}
          }, {
            upsert: true
          }, function (err, doc) {
            if (err) {
              console.log(err);
            }
          });

        }
 
      });
     
     
    });
    router.route('/login')
  //retrieve all comments from the database
  .get(function(req, res) {
    //looks at our Comment Schema
    User.find(function(err, users) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(users)
      
    });
  })
  .post(function(req, res) {
    let mssv = req.body.mssv;
    let pass = req.body.pass;  
    Admin.findOne({admin_name: mssv,password:pass},function(err, admin) {
      if (err)
        res.send(err);
    
     
      if(!admin){
        User.findOne({mssv: mssv,password:pass}, function(err, user) {
          if (err)
            res.send(err);
            if(!user){
              console.log('dang nhap user that bai');
             res.send('failed');
            }
            else{
              console.log('dang nhap user that bai');
              res.send(user.display_name);
            }
         
          
        });
      }
      else{
       
        console.log('dang nhap admin thanh cong');
       if(admin.is_admin)
       {
        res.send(admin);

       } 
       else{
         res.send(admin.display_name);
       }
        
        
      }

    });
    
   
   
   
  });
  ///////////////////////////////
  router.route('/logingoogle')     //////router sign-in with google
  //retrieve all comments from the database
  
  .post(function(req, res) {
     
    let mssv = req.body.mssv;
    console.log(req.body.mssv);
    User.find(function(err, user) {
      if (err)
        res.send(err);
      var result = user.filter(data => data.mssv == mssv); 
      if(result.length ==0){
        console.log('dang nhap that bai');
       res.send('failed');
      }
      else{
        console.log('dang nhap thanh cong'); 
        User.findOneAndUpdate({
          mssv: mssv,
        }, {
          $set: {active:true}
        }, {
          upsert: true
        }, function (err, doc) {
          if (err) {
            console.log(err);
          }
        });
        res.send(mssv);
      }

    });
   
   
  });
  router.route('/signup')
  .get(function(req, res) {
    //looks at our Comment Schema
    User.find(function(err, users) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(users)
      
    });
  })
  //retrieve all comments from the database
  .post(function(req, res) {
    var user = new User();
    //body parser lets us use the req.body
    user.display_name = req.body.display_name;
    user.phone = req.body.phone;
    user.password = req.body.password;
    user.email = req.body.email;
    user.mssv = req.body.mssv;
    user.full_name =req.body.full_name;
    user.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully added!' });
    });
  });
router.route('/getInfo') ///comment
.get(function(req, res) {/// tạo session trong phiên đăng nhập
  res.send(req.session.username)
  console.log(req.session.username)
  if(req.session.username){
         res.send(req.session.username);
      }
      else{res.send('CHUA_DANG_NHAP');}
      
   
  });
  ///////////////roter user info
  router.route('/changeInfoUser')
    //retrieve all comments from the database
   .get(function(req, res) {
     
    User.findOne({mssv: req.query.mssv}, function(err, user) {
            if (err)
              res.send(err);
            res.json(user)
            
          });
  
    })
    
    .post(function(req, res) { 
      var check = req.body.case;
     var info =req.body.info;
     var mssv = req.body.mssv;
     var query ={display_name: info};
     console.log(check)
     console.log(info)
     console.log(mssv)
     console.log(query)
     if(check ==='display_name') {
             query = {display_name: info};
    }
    else if(check === 'phone' )
    {
      query = {phone: info};
    }
    else if(check ==='password')
    {
      query = {password: info};
    }
      
        
          
        if(query !=null){
          User.findOneAndUpdate({
            mssv: mssv,
           
          }, {
            $set: query
          }, {
            upsert: true
          }, function (err, doc) {
            if (err) {
              console.log(err);
            }
          });
        }
 
    });
    ////////////////////////area of admin////////////////////
    ///////////////////////////
    router.route('/admin/signup')
    .get(function(req, res) {
      //looks at our Comment Schema
      Admin.find(function(err, admins) {
        if (err)
          res.send(err);
        //responds with a json object of our database comments.
        res.json(admins)
        
      });
    })
    //retrieve all comments from the database
    .post(function(req, res) {
      Admin.find(function(err, admin) {
        if (err)
          res.send(err);
        var result = admin.filter(data => data.admin_name === req.body.admin_name); 
        if(result.length >0){
          console.log('them that bai');
         res.send('failed');
        }
        else{
          console.log('them thanh cong'); 
          var admin = new Admin();
          admin.display_name = req.body.display_name;
          admin.phone = req.body.phone;
          admin.password = req.body.password;
          admin.email = req.body.email;
          admin.admin_name = req.body.admin_name;
          admin.save(function(err) {
            if (err)
              res.send(err);
          });
          res.send('success');
        }
  
      });
      
    })
    .delete(function(req, res) {
      
      if (req.query._id){
        Admin.find({_id: req.query._id}).remove().exec(function(err, expense) {
          if(err)
           res.send(err);
          res.send('Expense successfully deleted!');
        })
      }
      
    })
    .put(function(req, res) {  
      if (req.query._id){
        Admin.findOneAndUpdate({
          _id: req.query._id,
         
        }, {
          $set: {is_admin :req.query.is_admin}
        }, {
          upsert: true
        }, function (err, doc) {
          if (err) {
            console.log(err);
          }
        });
        Admin.find(function(err, admins) {
          if (err)
            res.send(err);
          res.json(admins)
          
        });
      }
      
    });
    router.route('/eventsuser')
    .post(function(req, res) {
      console.log(req.body)
      /*Admin.find(function(err, admin) {
        if (err)
          res.send(err);
        var result = admin.filter(data => data.admin_name === req.body.admin_name); 
        if(result.length >0){
          console.log('them that bai');
         res.send('failed');
        }
        else{
          console.log('them thanh cong'); 
          var admin = new Admin();
          admin.display_name = req.body.display_name;
          admin.phone = req.body.phone;
          admin.password = req.body.password;
          admin.email = req.body.email;
          admin.admin_name = req.body.admin_name;
          admin.save(function(err) {
            if (err)
              res.send(err);
          });
          res.send('success');
        }
  
      });
      */
    });
    


module.exports = router;