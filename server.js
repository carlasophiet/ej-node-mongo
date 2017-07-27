var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;


var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));


app.use(express.static('public') );


app.use(require("./controllers/routes"))


var url = 'mongodb://localhost:27017/ej-node-mongo';


MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log("ERRROR");
  } else {
    global.db = db;

    
    app.listen(3000, function () {
      console.log('its alive on port 3000!');
    });
  }
});
