const express = require('express');
const app = express();
const morgan = require('morgan');//middleware that logs requests
const mongoose = require('mongoose');//connects database
const bodyParser = require('body-parser');
const router = express.Router();
const appRoutes = require('./routes/api')(router);
const path = require('path');
const passport = require('passport');
const social = require('./passport/passport')(app, passport);

app.use(morgan('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use ('/api', appRoutes);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tutorial', {useMongoClient: true});

app.get('*', function (req,res){
   res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen( process.env.PORT || 4440, function(){
  console.log('server is listening on port 4440');
});