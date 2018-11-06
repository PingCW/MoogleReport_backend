const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//npm install nodemon --save-dev , no need to restart server everytime we change something
// set up express app

const app = express();

mongoose.connect('mongodb://localhost/usergo');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// initialize routes 
app.use('/api',require('./api'));

//error handling middleware
app.use(function(err,req,res,next){
   // console.log(err);
   res.satus(422).send({error: err.message});
});

//listen for requests
app.listen(process.env.port||3000, function(){
    console.log('now listening for requests');

});

