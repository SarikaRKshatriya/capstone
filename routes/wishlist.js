var express = require('express');
var router = express.Router();
var cors = require('cors');
var mongoose = require('mongoose');  
MongoClient = require('mongodb').MongoClient,

url = 'mongodb://localhost:27017/wishlists';

//mongoose.connect(url);   
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var wishlistModel= mongoose.model('wishlist', {
    email:String,
    id : String,
    name: String,
    quantity: Number,
    price: Number
});
//Get All wishlist
router.get('/wishlist', function(req, res, next){
    wishlistModel.find(function(err, wishlist){
        if(err){
            res.send(err);
        }
        res.json(wishlist);
    });
});

router.post('/wishlist', function(req, res) {
    var wishlist = req.body;
    wishlistModel.create({
        email:req.body.email,
        id : req.body.id,
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price

    }, function(err, wishlist) {
        if (err)
            res.send(err);

            wishlistModel.find(function(err, wishlist) {
            if (err)
                res.send(err)
            res.json(wishlist);
        });
    });

});

// Delete wishlist
router.delete('/wishlist/:id', function(req, res, next){
    wishlistModel.remove({id:req.params.id}, function(err, wishlist){
        if(err){
            res.send(err);
        }
        else {
            wishlistModel.find(function(err, wishlist) {
                if (err)
                    res.send(err)
                res.json(wishlist);
            });
        }
    });
});


module.exports = router;