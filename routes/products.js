var express = require('express');
var router = express.Router();
var cors = require('cors');
var mongoose = require('mongoose');  
MongoClient = require('mongodb').MongoClient,

url = 'mongodb://localhost:27017/products',

mongoose.connect(url);   
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var producteModel= mongoose.model('products', {
    id : String,
    name: String,
    description: String,
    category: String,
    quantity: Number,
    price: Number
});
//Get All products
router.get('/products', function(req, res, next){
    producteModel.find(function(err, products){
        if(err){
            res.send(err);
        }
        res.json(products);
    });
});

//Get Single products
// router.get('/products/:id', function(req, res, next){
//     db.products.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, product){
//         if(err){
//             res.send(err);
//         }
//         res.json(product);
//     });
// });

router.post('/products', function(req, res) {
    var product = req.body;
    producteModel.create({
        id : req.body.id,
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        quantity : req.body.quantity,
        category : req.body.category

    }, function(err, product) {
        if (err)
            res.send(err);

            producteModel.find(function(err, product) {
            if (err)
                res.send(err)
            res.json(product);
        });
    });

});

// Delete products
router.delete('/products/:id', function(req, res, next){
    producteModel.remove({id:req.params.id}, function(err, product){
        if(err){
            res.send(err);
        }
        else {
            producteModel.find(function(err, courses) {
                if (err)
                    res.send(err)
                res.json(courses);
            });
        }
    });
});


//Update products
router.put('/products/:id', function(req, res, next){
    var product = req.body;
    var updproduct = {
        id : req.body.id,
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        quantity : req.body.quantity,
        category : req.body.category
    };
    req.method="NONE";
    producteModel.update(req.params.id, updproduct,
     function(err, product){
            if(err){
                res.send(err);
            }
            res.json(product);
        });
    
});

module.exports = router;