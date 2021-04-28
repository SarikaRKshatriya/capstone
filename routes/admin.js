var express = require('express');
var router = express.Router();
var cors = require('cors');
var mongoose = require('mongoose');  
MongoClient = require('mongodb').MongoClient,

url = 'mongodb://localhost:27017/admin';

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var adminModel= mongoose.model('admin', {
    email: String,
    password: String
});
//Get admin details
router.get('/admin', function(req, res){
    adminModel.find(function(err, admin){
        if(err){
            res.send(err);
        }
        res.json(admin);
    });
});

module.exports = router;