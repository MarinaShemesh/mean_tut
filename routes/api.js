const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = 'harrypotter';

module.exports = function (router){
  //http://localhost.4440/api/users
  //   router.get('/', function (req,res){ //check the  connection
  //   res.send("the server says hi");
  // });

//USER REGISTRATION ROUTE
  router.post('/users', function (req,res){
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
      
    if (req.body.username == null || req.body.username == ' '
      || req.body.password == null || req.body.password == ' '
      || req.body.email == null || req.body.email== ''){
      
      res.json({ success: false, message: 'Ensure username, email and password were provided.'});
     } else {
      user.save(function (err){
        if (err){
          res.json({success: false, message: 'Username or email already exists.'});
        } else {
          res.json({success: true, message: 'New user created!'});
        }
      });
    }
    
  });
  
  //USER LOGIN ROUTE
  //http://localhost.4440/api/authenticate
  router.post('/authenticate', function (req, res){
    // res.send('testing the new route'); test in postman
   User.findOne({username:req.body.username})
     .select('email username password')
     .exec(function (err, user){
      
        if (err) throw err;

          if (!user) {
              res.json({ success: false, message: 'Could not authenticate' });
          } else if (user) {
              if (req.body.password) {
                  const validPassword = user.comparePassword(req.body.password);
                  if (!validPassword) {
                      res.json({ success: false, message: 'Could not validate Password' });
                  } else {
                      const token = jwt.sign({username:user.username, email:user.email}, 
                                secret, {expiresIn: '24h'});
                      res.json({ success: true, message: 'User Authenticate', token:token });
                  }
              } else {
                  res.json({ success: false, message: 'No password provided' });
              }
          }
      });
  });﻿
 
 router.use(function (req, res, next){
  const token = req.body.token || req.body.query || req.headers['x-access-token'];
   if (token){
    //verify token
    jwt.verify(token, secret, function (err, decoded){
      if(err) {
        res.json ({ success: false, message: 'Token invalid'});
      } else {
          req.decoded = decoded;
          next();
      }

    }); 

   } else {
    res.json({ success: false, message: 'No token provided'});
   }
 });

 router.post('/currentuser', function (req, res){
  res.send(req.decoded);
 });

  return router;
}

