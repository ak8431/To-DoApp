var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//creating a encoded url middleware
var urlencodedParser = bodyParser.urlencoded({extended: false});

//create schema
var contactListSchema = new mongoose.Schema({
	name : String,
	email : String,
	phone : String
});

//create a collection
var contact = mongoose.model('contactList', contactListSchema);
/*
var itemOne = contact({name: 'Amit Kumar', email : "amitkumar@gmail.com", phone: "9411373510"}).save(function(err){
	if(err) throw err;
	console.log('item saved');
});
*/
module.exports = function(app){
	//for parsing json data
	app.use(bodyParser.json());

	app.get('/fetchContact', function(req, res){
		contact.find({}, function(err, data){
			if(err) throw err;
			res.json(data);
		})
	});
	app.get('/fetchContact/:id', function(req, res){
		var id = req.params.id;
		contact.findOne({_id : id}, function(err, data){
			if(err) throw err;
			res.json(data);
		})
	});

	app.post('/addContact', urlencodedParser,function(req, res){
		// console.log(req.body);
		contact(req.body).save(function(err, data){
			if(err) throw err;
			res.json(data);
		});
	});

	app.delete('/deleteContact/:id', function(req, res){
		var id = req.params.id;
		// console.log(id);
		contact.remove({_id : id}, function(err, data){
			if(err) throw err;
			res.json(data);
		});
	});

	app.put('/updateContact/:id', function(req, res){
		var id = req.params.id;
		// console.log(req.body.phone);
		
		contact.update({
			query : {_id : id},
			update : {$set : {
				name : req.body.name,
				email : req.body.email,
				phone : req.body.phone
			}},
			new : true
		},
		function(err, data){
			res.json(data);
		});
		
	});
}