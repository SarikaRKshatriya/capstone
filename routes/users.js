var express = require('express');
var router = express.Router();
var cors = require('cors');
var mongoose = require('mongoose');  
MongoClient = require('mongodb').MongoClient,

url = 'mongodb://localhost:27017/users';

//mongoose.connect(url);   
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var userseModel= mongoose.model('users', {
    name : String,
    email: String,
    password: String,
    phone: Number,
    address: String,
    city: String,
    country:String,
    pin:Number
});
//Get All users
router.get('/users', function(req, res, next){
    userseModel.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});

//Get Single users
// router.get('/users/:id', function(req, res, next){
//     db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, product){
//         if(err){
//             res.send(err);
//         }
//         res.json(product);
//     });
// });

router.post('/users', function(req, res) {
    var users = req.body;
    userseModel.create({
        name : req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        country:req.body.country,
        pin:req.body.pin

    }, function(err, users) {
        if (err)
            res.send(err);

            userseModel.find(function(err, users) {
            if (err)
                res.send(err)
            res.json(users);
        });
    });

});

// Delete users
router.delete('/users/:email', function(req, res, next){
    userseModel.remove({email:req.params.email}, function(err, users){
        if(err){
            res.send(err);
        }
        else {
            userseModel.find(function(err, users) {
                if (err)
                    res.send(err)
                res.json(users);
            });
        }
    });
});


//Update users
// router.put('/users/:id', function(req, res, next){
//     var users = req.body;
//     console.log(req.params);
//     var updproduct = {
//         id : req.body.id,
//         name : req.body.name,
//         description : req.body.description,
//         price : req.body.price,
//         quantity : req.body.quantity,
//         category : req.body.category
//     };

//     producteModel.update(req.params.id, updproduct,
//      function(err, product){
//             if(err){
//                 res.send(err);
//             }
//             res.json(product);
//         });
    
// });

module.exports = router;