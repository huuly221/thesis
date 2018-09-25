var express = require('express');
var app = express();
var router = express.Router();
var GetEvent = require('./getEvent');
var GetDocument = require('./getDocument.js');
var User = require('./addUser.js');
var Admin = require('./addAmin.js');
var UserEvent = require('../models/user-event.js')
var GetEventDetail = require('../models/getEventDetail.js');
var multer = require('multer');
//const bcrypt = require('bcrypt');
var fs = require('fs');
var mongoose = require('mongoose'); 
var Feedback = require('../models/feedback.js');
var LoadDocumentFile = require('../models/loadDocumentFile.js'); 
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

router.route('/')
.get( function(req, res) {
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
        res.json('Expense successfully updated!');
       
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
          res.json('Expense successfully deleted!');
        })
      }
      
    });

    router.route('/eventdetail')
    .get(function(req, res) {
      console.log('da get')
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
   
    Admin.findOne({admin_name: mssv},function(err, admin) {
      if (err)
        res.send(err);
        if(admin!=null){
//bcrypt.compare(pass, admin.password, function(err, response) {
            if(admin.password == pass) {
                  console.log('dang nhap admin thanh cong');
                  if(admin.is_admin)
                  {
                    res.json(admin);
                  } 
                  else{
                    res.json(admin.display_name);
                  }
            } else {
              res.json('failed');
            } 
          

        }
        else{
          User.findOne({mssv: mssv}, function(err, user) {
            if (err)
              res.send(err);
              if(user!=null){
                //bcrypt.compare(pass, user.password, function(err, response) {
                  if(user.password == pass) {
                    res.json(user.display_name);
                  } else {
                    res.json('failed');
                  } 
                
              }
              else{
                res.json('failed');
              }
              
          });
        }
        
    });
  });
  ///////////////////////////////
  router.route('/logingoogle')     //////router sign-in with google
  //retrieve all comments from the database
  
  .post(function(req, res) {
    
    let mssv = req.body.mssv;
    console.log(req.body.mssv);
    User.findOne({mssv:mssv},function(err, user) {
      if (err)
        res.send(err);
      
      if(!user){
        console.log('dang nhap that bai');
       res.json('failed');
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
        res.json(user);
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
    user.email = req.body.email;
    user.mssv = req.body.mssv;
    user.full_name =req.body.full_name;
   // bcrypt.hash(req.body.password, 10, function(err, hash) {
     if(err)
     res.send(err);
     user.password = req.body.password;
     user.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully added!' });
    });
     
     
  });
router.route('/getInfo') ///comment
.get(function(req, res) {/// tạo session trong phiên đăng nhập
  res.json(req.session.username)
  console.log(req.session.username)
  if(req.session.username){
         res.json(req.session.username);
      }
      else{res.json('CHUA_DANG_NHAP');}
      
   
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
     var query ;
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
     // bcrypt.hash(info, 10, function(err, hash) {
        User.findOneAndUpdate({
          mssv: mssv,
         
        }, {
          $set: {password: info}
        }, {
          upsert: true
        }, function (err, doc) {
          if (err) {
            console.log(err);
          }
        });
        
       
        
      
      
    }
      
        
          
        if(query!=null)
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
      Admin.findOne({admin_name:req.body.admin_name},function(err, admin) {
        if (err)
          res.send(err);
         
        
        if(admin!=null){
          console.log('them that bai');
         res.json('failed');
        }
        else{
          User.findOne({mssv:req.body.admin_name},function(err, user) {
            if(user !=null)
            { console.log('them that bai'); 
            res.json('failed');
            }
            else{
              console.log('them thanh cong'); 
              var admin = new Admin();
              admin.display_name = req.body.display_name;
              admin.phone = req.body.phone;
              admin.email = req.body.email;
              admin.admin_name = req.body.admin_name;
             // bcrypt.hash(req.body.password, 10, function(err, hash) {
                admin.password = req.body.password;
                admin.save(function(err) {
                  if (err)
                    res.send(err);
                });
                res.json('success');
            
            }
          });
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
  .get(function(req, res) {
    if(req.query.code){
    UserEvent.find({code_event: req.query.code}, function(err, events) {
        if (err)
          res.send(err);
          if(events.length===0){  ////empty register
            GetEventDetail.findOne({_id: req.query.code},function(err, eventname){
              if(err)
              res.send(err);
              res.json(eventname)
            });
          }
        else{
          res.json(events);
          }
        
      });
    }
    else if(req.query.mssv){
      UserEvent.find({mssv: req.query.mssv}, function(err, events) {
        if (err)
          res.send(err);
          res.json(events);  
      });
    }

  })
  
    .post(function(req, res) {
       console.log(req.body)
       UserEvent.findOne({mssv: req.body.mssv, code_event:req.body.code_event},function(err,userevent) {
        if (err)
        res.send(err);
        var register =new UserEvent();
        if( userevent===null){
          if(req.body.email === undefined || req.body.full_name ===undefined ){   /////check data from admin add new register 
            User.findOne({mssv: req.body.mssv}, function(err, user) {
            if (err)
              res.send(err);
              register.title = req.body.title;
              register.code_event = req.body.code_event;
              register.startDate = req.body.startDate;
              register.endDate = req.body.endDate;
              register.mssv = user.mssv;
              register.full_name = user.full_name;
              register.email = user.email;
              register.phone = user.phone;
              register.save(function(err) {
                if (err)
                  res.send(err);
                res.json({ message: 'event of user successfully added!' });
                });
              
            });
          }
            else{
              register.title = req.body.title;
              register.code_event = req.body.code_event;
              register.startDate = req.body.startDate;
              register.endDate = req.body.endDate;
              register.mssv = req.body.mssv;
              register.full_name = req.body.full_name;
              register.email = req.body.email;
              register.phone = req.body.phone;
              register.save(function(err) {
                if (err)
                  res.send(err);
                res.json({ message: 'event of user successfully added!' });
                });
          }
       
        }
        else{
          res.json('duplicate_event'); ///dang ki trung su kien
        }
    });
      
    })
    .delete(function(req, res) {
      
      

      if (req.query._id){
        UserEvent.find({_id: req.query._id}).remove().exec(function(err, expense) {
          if(err)
           res.send(err);
          res.json('Expense successfully deleted!');
        })
      }
      if(req.query.code_event&&req.query.mssv)
      {
        UserEvent.findOne({mssv: req.query.mssv,code_event:req.query.code_event},function(err, expense) {
          if(err)
           res.send(err);
           if(expense != null){
            UserEvent.find({mssv: req.query.mssv,code_event:req.query.code_event}).remove().exec(function(err, expense) {
                  if(err)
                  res.send(err);
                  console.log("da delete xong")
                  res.json('Expense successfully deleted!');
              })
            }
            else{
              res.json('not_registry'); /// send to bkevent to check resgister event
            }
        });
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
	router.route('/feedback')
    //retrieve all comments from the database
    .get(function(req, res) {
      //looks at our Comment Schema
      Feedback.find(function(err, feedbacks) {
        if (err)
          res.send(err);
        //responds with a json object of our database comments.
        res.json(feedbacks)
        
      });
    })
    .post(function(req, res) {

          var feedback = new Feedback();
          feedback.name = req.body.name;
          feedback.email = req.body.email;
          feedback.subject = req.body.subject;
          feedback.content = req.body.content;

            feedback.save(function(err) {
              if (err)
                res.send(err);
            });
    });
	//// handle file document/////////////////////////////////////

    router.route('/documentfile')
    .get(function(req, res) {
      if (req.query._id == undefined || req.query._id == null || req.query._id == ''){
        console.log("params 1", req.query._id);
        LoadDocumentFile.find({}, null, {sort: {date: -1}},function(err, events) {
          if (err)
            res.send(err);
          res.json(events)
          
        });
      }
      else {
        console.log("params 2", req.query._id);
        LoadDocumentFile.findOne({_id: req.query._id}, function(err, event) {
          if (err)
            res.send(err);
          res.json(event)
          
        });
      }
      
    })

    router.post('/documentfile', function (req,res) { 
      if (req.body.category){
        var documentObject = new LoadDocumentFile(req.body);
        documentObject.save(function(err) {
          if (err)
            res.send(err);    
        });
       
      } 
     });

     router.post('/documentfilepath', function(req,res, next){
        upload(req,res,function(err){
          if (req.files){
            var key = req.files[0].destination + '/'+ req.files[0].originalname;
            if (req.query._id == undefined){
              LoadDocumentFile.find(function(err, item){
                if(item){
                  LoadDocumentFile.findOneAndUpdate({}, {$set: {file: key}}, {sort: {date: -1}, upsert:true}, function (err, doc) {
                    if (err) {
                      console.log(err);
                    }
                    else {
                      console.log("success");
                      console.log("key update ", key);
                    }
                  });
                }
                
              });
            }
            else {
              console.log("tìm thấy id: ", req.query._id);
              LoadDocumentFile.find(function(err, item){
                if(item){
                LoadDocumentFile.findOneAndUpdate({_id: req.query._id}, {$set: {file: key}}, {sort: {date: -1}, upsert:true}, function (err, doc) {
                  if (err) {
                    console.log(err);
                  }
                  else {
                    console.log("key update ", key);
                  }
                  console.log("grgrgrgrrgrrrrrggggggggggggggg");
                });
              }
              });
            }
            
          }
          
        });
       
     })
    

    router.post('/updatedocumentfile', function (req,res) { 
      var updatedata = req.body;
      if (req.body._id){
        LoadDocumentFile.update({_id: req.body._id}, updatedata, function(err, item){
          if (err)
          res.send(err);
        res.send('Expense successfully updated!');
       
        }); 
      }
    });
 router.delete('/documentfile/delete', function(req,res){
      console.log("delete ID: ", req.query._id);
      console.log("delete: ", req.body);
      if (req.query._id){
        LoadDocumentFile.find({_id: req.query._id}).remove().exec(function(err, expense) {
          if(err)
           res.send(err);
          res.send('Expense successfully deleted!');
        })
      }
      
    });


   
    
/*
    //////////////////////////////////////////////////////
    router.route('/login')
   
    .post(function(req, res) {
      let mssv = req.body.mssv;///// vừa là mssv tên đăng nhập của user vừa có thể là admin_name của admin
      let pass = req.body.pass; 
      let token = req.query.token 
     
      Admin.findOne({admin_name: mssv},function(err, admin) {//////////tìm trong admin
        if (err)
          res.send(err);

          if(admin!=null){ ////////////////////là admin
            bcrypt.compare(pass, admin.password, function(err, response) {///////////kiểm tra hash
              if(response) {
                    console.log('dang nhap admin thanh cong');
                    /////////////// hàm update
                    Admin.findOneAndUpdate({
                      admin_name: mssv,
                     
                    }, {
                      $set: {token :token}
                    }, {
                      upsert: true
                    }, function (err, doc) {
                      if (err) {
                        console.log(err);
                      }
                    });
                    ///////////////////
                    if(admin.is_admin)
                    {
                      res.json(admin);
                    } 
                    else{
                      res.json(admin.display_name);
                    }
              } else {
                res.json('failed');
              } 
            }); 
  
          }
          else{/////////////////////là user
            User.findOne({mssv: mssv}, function(err, user) {
              if (err)
                res.send(err);
                if(user!=null){
                  bcrypt.compare(pass, user.password, function(err, response) {
                    /////////////////////////đang nhap user thanh cong 
                    User.findOneAndUpdate({
                      mssv: mssv,
                     
                    }, {
                      $set: {token :token}
                    }, {
                      upsert: true
                    }, function (err, doc) {
                      if (err) {
                        console.log(err);
                      }
                    });

                    if(response) {
                      res.json(user.display_name);
                    } else {
                      res.json('failed');
                    } 
                  });
                }
                else{
                  res.json('failed');
                }
                
            });
          }
          
      });
    });
    router.route('/update-token')
    .put(function(req, res) {  
      let mssv = req.body.mssv;///// vừa là mssv tên đăng nhập của user vừa có thể là admin_name của admin
      let token = req.body.token
      
        
      Admin.findOne({admin_name: mssv},function(err, admin) {//////////tìm trong admin
        if (err)
          res.send(err);

          if(admin!=null){ ////////////////////là admin
           
                    Admin.findOneAndUpdate({
                      admin_name: mssv,
                     
                    }, {
                      $set: {token :token}
                    }, {
                      upsert: true
                    }, function (err, doc) {
                      if (err) {
                        console.log(err);
                      }
                    });

          }
          else{/////////////////////là user
            User.findOne({mssv: mssv}, function(err, user) {
              if (err)
                res.send(err);
                if(user!=null){
                    /////////////////////////đang nhap user thanh cong 
                    User.findOneAndUpdate({
                      mssv: mssv,
                     
                    }, {
                      $set: {token :token}
                    }, {
                      upsert: true
                    }, function (err, doc) {
                      if (err) {
                        console.log(err);
                      }
                  
                  });
                }
                
                
            });
          }
          
      });
    });
   router.route('/notify')
    .get(function(req, res) {  ///get post tùy ý
      req.query.mssv /////gửi truy vấn tư cách là thành viên đó
      
      User.findOne({mssv: req.query.mssv },function(err, user) { /// tìm token user
      UserEvent.find({mssv: req.query.mssv },function(err, event) {//////////tìm trong list sự kiện sinh viên đăng kí
        if (err)
          res.send(err);
          let startDate= new Date(event.startDate).getTime();
          let  endDate = new Date(event.endDate).getTime();
          if(Date.now() >= (startDate-24*60*60*1000) && Date.now() <=startDate) //sự kiện còn cách khoảng 1 ngày
          {
            res.json({message:{token:user.token,notification:{title:event.title,body:"Sự kiện sắp diễn ra"}}})
          }
          if(Date.now() >= startDate && Date.now() <= endDate) //sự kiện đang trong thời gian diễn ra
          {
            res.json({message:{token:user.token,notification:{title:event.title,body:"Sự kiện đang diễn ra"}}})
          }
      });
      GetEventDetail.find({}, null, {sort: {date: -1}},function(err, events) { ////các list sự kiện mới nhất 
        if (err)
          res.send(err);
          let date = new Date(events.date).getTime(); /// ngày đăng bài
          if( Date.now() >= date && Date.now() <= (date+24*60*60*1000)) /// bài đăng mới đăng trong 1 ngày
          res.json({message:{token:user.token,notification:{title:events.title,body:"Bài viết mới "}}})
        
      });


    });
  });
      */
   

module.exports = router;