var app = angular.module("basicApps", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider){
	$routeProvider.when('/',{
		templateUrl : 'views/home.html',
		controller : 'homeController'
	}).when('/contact', {
		templateUrl : 'views/contactApp.html',
		controller : 'contactAppController'
	}).when('/todo', {
		templateUrl : '/views/todo.html',
		controller : 'todoController'
	}).otherwise({
		redirectTo : '/'
	});
	$locationProvider.html5Mode(true);
});

//services


//home controller
app.controller('homeController', ['$scope', function($scope){
	$scope.msg = "Hello";
}]);

//contactapp controller
app.controller('contactAppController', ['$scope', '$http', '$route', function($scope, $http, $route){
	$scope.msg = "Hello";
	$http({
		url : '/fetchContact',
		method : 'GET'
	}).then(function(response){
		console.log(response.data);
		$scope.contactList = response.data;
	}, function(response){
		console.log(response.err);
	});

	//add contact
	$scope.addContact = function(){
		console.log($scope.contactDetails);
		$http({
			method : 'POST',
			url : '/addContact',
			data : $scope.contactDetails
		}).then(function(response){
			console.log(response.data);
			$route.reload();
		}, function(response){
			console.log("Error Sending Data");
			$route.reload();
		});
	}

	//delete contact
	$scope.deleteContact = function(id){
		console.log(id);
		$http({
			url : '/deleteContact/'+id,
			method: 'DELETE'
		}).then(function(response){
			console.log('Contact Deleted');
			$route.reload();
		}, function(response){
			console.log('Error Deleting Contact');
		});
	}

	//edit contact
	$scope.editContact = function(id){
		$http({
			url : '/fetchContact/' + id,
			method : 'GET'
		}).then(function(response){
			console.log('data copy successful');
			$scope.contactDetails = response.data;
		}, function(response){
			console.log('Error');
		});
	}

	//update contact list
	$scope.updateContact = function(){
		// console.log($scope.contactDetails._id);
		$http({
			url : '/updateContact/' + $scope.contactDetails._id,
			method : 'PUT',
			data : $scope.contactDetails
		}).then(function(response){
			console.log('Contact Updated Successfully');
			$route.reload();
		}, function(response){
			console.log('Error Updating contact');
		});
	}

}]);

//todo app controller
app.controller('todoController', ['$scope', '$http', '$route', function($scope, $http, $route){
	$scope.msg = "Hello";
	$http({
		url : '/getItem',
		method : 'GET'
	}).then(function(response){
		console.log(response.data);
		$scope.todoList = response.data;
	}, function(response){
		console.log("Error : " + response.data);
	});

	//add item
	$scope.addItemToList = function(){
		$http({
			method : 'POST',
			url : '/addItem',
			data : $scope.item
		}).then(function(response){
			console.log(response.data);
			$route.reload();
		}, function(response){
			console.log('Error adding item');
		});
	};

	//delete item
	$scope.deleteItem = function(id){
		$http({
			method : 'DELETE',
			url : '/deleteItem/'+id
		}).then(function(response){
			console.log('Item Deleted');
			$route.reload();
		}, function(response){
			console.log('Error Deleting Item');
		});
	}

}]);