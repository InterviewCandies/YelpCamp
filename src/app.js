const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStratetry = require('passport-local');
const methodOverride = require('method-override');
const User = require('./database/models/user')
const authRoutes = require('./routes/authentication')
const campingRoutes = require('./routes/camping');
const commentRoutes = require('./routes/comment');
app.use(express.static( __dirname + '/public'));
app.use(flash());
app.use(require('express-session',)({
    secret : "Hi my name is Thang",
    resave : true,
    saveUninitialized : false
}));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratetry(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser : true})
        .then(() => {
            console.log('Database is running');
        })
        .catch(err => {
            console.log(err);
        })

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use(authRoutes);
app.use('/camping',campingRoutes);
app.use('/camping/:id/comment',commentRoutes);

app.listen(3000, function() {
    console.log('Server is running')
});