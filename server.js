var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var products = require('./routes/products');
var users = require('./routes/users');
var admin = require('./routes/admin');
var cart = require('./routes/cart');
var wishlist = require('./routes/wishlist');
const onHeaders = require('on-headers');



//Port

var port = 3000;

var app = express();

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
    '.webp'
  ];

//View Engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


    // Redirect all the other resquests
    app.get('/*', (req, res) => {
        if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
          res.sendFile(path.resolve(`medicare/public/${req.url}`));
        } else {
          res.sendFile(path.resolve('medicare/public/index.html'));
        }
        onHeaders(res, function () {
            this.removeHeader('etag');
        });
      });

//CORS Middleware

app.use(cors());

// Routes

app.use('/api', products);
app.use('/api', users);
app.use('/api', cart);
app.use('/api', admin);
app.use('/api', wishlist);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
    });

app.listen(port, function(){
    console.log('Server started on port ' + port);
});

