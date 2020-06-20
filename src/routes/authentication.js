const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../database/models/user');

router.get('/', function(req, res) {
    res.render('landing')
});

router.post('/login', passport.authenticate("local", {successRedirect: '/camping', failureRedirect: '/login'}), function(req, res) {
  
})

router.get('/login', function(req, res) {
    res.render('login');
})

router.post('/register', function(req, res) {
    let newUser = new User({username : req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect('/register');
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Sign up successfully. Welcome to YelpCamp");
            res.redirect("/camping");
        })
    })
})

router.get('/register', function(req, res) {
    res.render('register');
})

router.get('/logout', function(req, res) {
    req.logOut();
    req.flash('success', "You now logged out");
    res.redirect('/camping');
})

module.exports = router;