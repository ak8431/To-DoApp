var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//creating a encoded url middleware
var urlencodedParser = bodyParser.urlencoded({extended: false});

//create a schema
var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);
/*
//create a single data to be inserted into database
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
	if(err) throw err;
	console.log('item saved');
});
*/

//creating a dummy data
//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item : 'kick some coding ass'}];

module.exports = function(app){
	app.use(bodyParser.json());
	
	//setting up the basic route
	app.get('/getItem', function(req, res){
		//get data from monogodb and pass it to view
		Todo.find({}, function(err, data){
			if(err) throw err;
			res.json(data);
		});
	});
	
	//posting data from page to database
	app.post('/addItem', urlencodedParser,function(req, res){
		//get data from view and add it database
		// console.log(req.body);
		Todo(req.body).save(function(err, data){
			if(err) throw err;
			res.json(data);
		});
	});

	//deleting data by passing the item
	app.delete('/deleteItem/:id', function(req, res){
		//delete data from database
		var id = req.params.id;
		Todo.remove({_id : id}, function(err, data){
			if(err) throw err;
			res.json(data);
		})
	});

};