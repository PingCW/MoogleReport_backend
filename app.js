const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const UserModel = require('./model/model');
const MessageModel = require('./model/message');

app.use(express.json())
app.use(passport.initialize())

mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt', { useNewUrlParser : true });
mongoose.connection.on('error',error=>console.log(error));
mongoose.Promise=global.Promise;

const auth = require('./auth/auth');
auth.initalize(passport);
const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');
app.use('/', routes);
app.use('/user',passport.authenticate('jwt',{session:false}),secureRoute);

app.listen(3000,()=>{
    console.log('Server started')
});