 const FacebookStrategy = require('passport-facebook').Strategy;
 const User = require('../models/user');
 const session = require('express-session');
 const jwt = require('jsonwebtoken');
 const secret = 'harrypotter';

  module.exports = function (app, passport) {
   
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: 'keyboard cat',
                      resave: false,
                      saveUninitialized: true,
                      cookie: { secure: false } }));
      
      passport.serializeUser(function (user, done) {
        token = jwt.sign({username:user.username, email:user.email}, secret, {expiresIn: '24h'});
         done(null, user.id);               
      });

      passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
          done(err, user);
        });
      });
   

     passport.use(new FacebookStrategy({
        clientID: '283740868793769',
        clientSecret: 'a4b56745b9e815ea5b507466fabcf6c8',
        callbackURL: 'http://localhost:4440/auth/facebook/callback',
        profileFields:['id', 'displayName', 'photos', 'email']
      },

      function (accessToken, refreshToken, profile, done) {
      console.log('profile:', profile._json.email);
      User.findOne({ email: profile._json.email })
        .select('username password email')
        .exec(function (err, user){
          if (err) done(err);

          if (user && user != null) {
            done (null, user);
          } else {
            done(err);
          }
        });
       }
     ));

      app.get('/auth/facebook/callback', 
       passport.authenticate('facebook', { failureRedirect: '/login' }),
       function (req,res) {
        res.redirect('/facebook/' + token);
       });

      app.get('/auth/facebook',
        passport.authenticate('facebook', { scope: 'email' }));
   
        return passport;
  }