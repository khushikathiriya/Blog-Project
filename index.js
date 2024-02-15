const express = require('express');

const port = 8001;

const app = express();

const path = require('path');

// const db = require('./config/mongoose');
const mongoose = require('mongoose');
mongoose
    .connect("mongodb+srv://khushikathiriyak:khushi777@cluster0.noxxovd.mongodb.net/khushi", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('Database connected.'))
    .catch(err => console.log(err));



const cookieparser = require('cookie-parser');

const session = require('express-session');

const passport = require('passport');

const adminmodel = require('./models/admin');

const passportlocal = require('./config/passport-local-strategy');
const { connect } = require('http2');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(cookieparser());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname,'asstes')));
app.use(express.static(path.join(__dirname,'userasstes')));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(session({
    name : 'khushi',
    secret : 'khushi',
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 1000*60*100,
    }
    
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/user'));
app.use('/admin',require('./routes/admin'));


app.listen(port,(err)=>{
    if(err)
        console.log('err')

    console.log(`server runing on this is port,${port}`);

})