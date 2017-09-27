const User = require('../models/user');

module.exports = function (router){

  //   router.get('/', function (req,res){ //check the  connection
  //   res.send("the server says hi");
  // });


  router.post('/users', function (req,res){
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
      
    if (req.body.username == null || req.body.username == ' '
      || req.body.password == null || req.body.password == ' '
      || req.body.email == null || req.body.email== ''){
      
      res.send('Ensure username, email and password were provided');
     } else {
      user.save(function (err){
        if (err){
          res.send('username or email already exists');
        } else {
          res.send('new user created');
        }
      });
    }
    
  });

  return router;

}

