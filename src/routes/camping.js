const express = require('express');
const router = express.Router();
const Camp = require('../database/models/camp');
const middleware = require('../middleware');

router.get('/', function(req, res) {
    Camp.find({}, function(err, camps) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('camping/camping', {campings : camps});
        }
    })
})

router.post('/', middleware.isLoggedIn, function(req, res) {
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let price = req.body.price;
    let author = {
        id : req.user._id,
        username : req.user.username
    }
    let newCamp = {
        name : name, 
        image : image,
        description : desc,
        price : price,
        author : author
    };
    Camp.create(newCamp, function(err, newlyCreated) {
        if (err) {
            req.flash("error", "Cant add new campsite");
            res.redirect('/camping');
        }
        else {
            req.flash("success", "New campsite is added");
            res.redirect('/camping');
        }
    })
})

router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('camping/new'); 
})

router.get('/:id/edit', middleware.checkCampOwnerShip, function(req, res) {
    Camp.findById(req.params.id, function(err, foundCamp) {
        if (err) {
            res.redirect('/camping');
        }
        else {
            res.render('camping/edit', {camp : foundCamp});
        }
    })
})

router.put('/:id',middleware.checkCampOwnerShip, function(req, res) {
    Camp.findByIdAndUpdate(req.params.id, req.body.camping, function(err, updatedCamp) {
        if (err) {
            res.redirect('back');
        }
        else {
           res.redirect('/camping/'+req.params.id);
        }
    })
})

router.delete('/:id', middleware.checkCampOwnerShip, function(req, res) {
    Camp.findByIdAndRemove(req.params.id, function(err, deletedCamp) {
        if (err) {
            res.redirect("back");
        }
        else {
            req.flash("success", "Delete campsite successfully");
            res.redirect('/camping');
        }
    })
})

router.get('/:id', function(req, res) {
    const id = req.params.id;
    Camp.findById(id).populate("comments").exec( function(err, camp) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('camping/details', { camp : camp});
        }
    })
})


module.exports = router;