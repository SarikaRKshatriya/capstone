var express = require('express');
var router = express.Router();
var cors = require('cors');
var mongoose = require('mongoose');  
MongoClient = require('mongodb').MongoClient,

url = 'mongodb://localhost:27017/carts';

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var cartModel= mongoose.model('carts', {
    email:String,
    id : String,
    name: String,
    quantity: Number,
    price: Number
});
//Get All cart
router.get('/cart', function(req, res, next){
    cartModel.find(function(err, cart){
        if(err){
            res.send(err);
        }
        res.json(cart);
    });
});

router.post('/cart', function(req, res) {
    var cart = req.body;
    cartModel.create({
        email:req.body.email,
        id : req.body.id,
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price

    }, function(err, cart) {
        if (err)
            res.send(err);

            cartModel.find(function(err, cart) {
            if (err)
                res.send(err)
            res.json(cart);
        });
    });

});

// Delete cart
router.delete('/cart/:id', function(req, res, next){
    if(req.params.id == 0){
        cartModel.remove({}, function(err, cart){
            if(err){
                res.send(err);
            }
            else {
                cartModel.find(function(err, cart) {
                    if (err)
                        res.send(err)
                    res.json(cart);
                });
            }
        });
    }
    else{

    
    cartModel.remove({id:req.params.id}, function(err, cart){
        if(err){
            res.send(err);
        }
        else {
            cartModel.find(function(err, cart) {
                if (err)
                    res.send(err)
                res.json(cart);
            });
        }
    });
}
});


//Update cart
router.put('/cart/:id', function(req, res, next){
    var cart = req.body;
    var updcart = {
        id : req.body.id,
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        quantity : req.body.quantity,
        category : req.body.category
    };

    cartModel.update(req.params.id, updcart,
     function(err, cart){
            if(err){
                res.send(err);
            }
            res.json(cart);
        });
    
});

module.exports = router;