(function(){

"use strict";
				//I make request of data and changes in my database
	angular
		.module('app')
		.service('dataService', function($http){

			this.getRecipes = function(callback){
		    $http.get('http://localhost:5000/api/recipes/')
		    .then(callback)
		} 
		  	this.getCategories = function(callback){
		    $http.get('http://localhost:5000/api/categories')
		    .then(callback)
		}
		    this.getFoodItems = function(callback){
		    $http.get('http://localhost:5000/api/fooditems/')
		    .then(callback)
		}

		  this.getRecipesCategory = function (category, callback) {
            $http.get(`http://localhost:5000/api/recipes?category=${category.name}`)
            .then(callback);
        }
		    this.getRecipeId = function(id,callback){
		    $http.get(`http://localhost:5000/api/recipes/${id}`)
		    .then(callback)
		}
		    this.putRecipe = function(recipe,callback,errorCallback){
		    $http.put(`http://localhost:5000/api/recipes/${recipe._id}`, recipe)
		    .then(callback,errorCallback)
		}
		    this.postRecipe = function(recipe,callback,errorCallback){
		    $http.post('http://localhost:5000/api/recipes/', recipe)
		    .then(callback, errorCallback)
	    }

	    	this.delRecipe = function(id,callback){
			$http.delete(`http://localhost:5000/api/recipes/${id}`)
		}
	
	})

})();