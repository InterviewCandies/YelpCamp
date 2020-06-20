const Camp = require('../database/models/camp');
const Comment = require('../database/models/comment');
module.exports = {
        
   isLoggedIn : function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "You have to login first");
        res.redirect('/login');
    },

    checkCampOwnerShip: function(req, res, next) {
        if (req.isAuthenticated()) {
            Camp.findById(req.params.id, function(err, foundCamp) {
                if (err) {
                    req.flash("error", "Can't find campsite");
                    res.redirect('back');
                }
                else {
                    if (foundCamp.author.id.equals(req.user._id)) {
                        next();
                    }
                    else {
                        req.flash("error", "Permission denied");
                        res.redirect('back');
                    }
                }
            })
        }
        else {
            req.flash("error", "You need to login first");
            res.redirect('back');
        }
    },

    checkCommentOwnerShip : function(req, res, next) {
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if (err) {
                    req.flash("error", "Can't find campsite");
                    res.redirect('back');
                }
                else {
                    if (foundComment.author.id.equals(req.user._id)) {
                        next();
                    }
                    else {
                        req.flash("error", "Permisson denied"); 
                        res.redirect('back');
                    }
                }
            })
        }
        else { 
            req.flash("error", "You have to log in first");
            res.redirect('back'); 
        }
    }

}