(function(){

	"use strict";  //I create recipes.js and generate controller module
					
	angular
		.module('app')
		.controller('RecipesController', RecipesController);		

function RecipesController($scope, dataService,$location){ //in controller function I pass the variables

			dataService.getRecipes(function(response){ 
				$scope.recipes = response.data;	 //the response of recipes goes in my scope recipes
			});

			dataService.getCategories(function(response){
				$scope.categories = response.data; //the response of categories goes in my scope fooditems
			});
			
			dataService.getFoodItems(function(response){
				$scope.foodItems = response.data; //the response of fooditems goes in my scope fooditems
			});	


			$scope.changeLocation = function (path) { //the function changeLocation change the path in my url
                $location.path('/' + path)
        		}
		 
			$scope.delete = function (recipe,path) { //with this function a I delete the recipes
			 	var isConfirmed = confirm("Are you sure to delete this recipe?");//I generate the question
	          	if(isConfirmed){ //if the question is confirmed the program delete a recipe
	           		 dataService.delRecipe(recipe._id);
	           		 $location.path('/' + path)
	            }else {
		        		return false; //if not nothing happen
		     	}
			}
		};

})();