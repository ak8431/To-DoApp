var express = require('express');
var mongoose = require('mongoose');
var contactListRoute = require('./routes/schema.js');
var todoListRoute = require('./routes/todoSchema.js');

var app = express();

//connecting to database
var uri = mongoose.connect('mongodb://localhost:27017/basicApps');

//serving static files
app.use(express.static(__dirname+'/public'));

//fire database function
contactListRoute(app);
todoListRoute(app);

app.use(function(req, res){
	res.sendFile(__dirname+'/public/index.html');
});

app.listen(3005, function(err){
if(err){
	throw err;
}else{
	console.log('Server Started at 3005');
}
});