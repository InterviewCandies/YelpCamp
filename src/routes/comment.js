const express = require('express');
const router = express.Router({mergeParams : true});
const Comment = require('../database/models/comment');
const Camp = require('../database/models/camp');
const camp = require('../database/models/camp');
const middleware = require('../middleware')

router.post('/', middleware.isLoggedIn, function(req, res) {
    let comment = req.body.comment;
    comment['author'] = {id : req.user._id, username: req.user.username}
    Comment.create(comment, function(err, newComment) {
        if (err) {
            console.log(err);
        }
        else {

            Camp.findById(req.params.id, function(err, camp) {
                if (err) {
                    console.log(err);
                }
                else {
                    camp.comments.push(newComment);
                    camp.save();
                }
            })
        }
    })
    res.redirect('/camping/' + req.params.id);
})

router.get('/new', middleware.isLoggedIn, function(req, res) {
    Camp.findById(req.params.id, function(err, camp) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('comment/new.ejs', {camp : camp});
        }
    })
})

router.get('/:comment_id/edit', middleware.checkCommentOwnerShip, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect('back');
        }
        else {
            res.render('comment/edit', { camp_id: req.params.id, comment: foundComment});
        }
    })
})

router.put('/:comment_id', middleware.checkCommentOwnerShip, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect('back');
        }
        else {
            res.redirect('/camping/'+ req.params.id);
        }
    })
})

router.delete('/:comment_id', middleware.checkCommentOwnerShip, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err , deletedCamp) {
        if (err) {
            res.redirect('back');
        }
        else {
            req.flash("success", "Comment deleted");
            res.redirect('/camping/' + req.params.id);
        }
    })
})

module.exports = router;