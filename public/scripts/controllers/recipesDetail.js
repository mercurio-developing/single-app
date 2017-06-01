(function(){

    'use strict';   //I create recipesDetail.js and generate controller module

	angular
		.module('app')
		.controller('RecipeDetailController', RecipeDetailController);

function RecipeDetailController ($scope, dataService,$location){ 

const id = $location.url().split('/')[2]; //I take the id of my URL
    
if (id !== undefined){  //If id is undefined or defined I put my data in my scope 

        dataService.getRecipeId(id, function (response) {
        $scope.recipe = response.data;
        });
    
    }
        dataService.getCategories(function(response){                               
        $scope.categories = response.data; //the response of categories goes in my scope fooditems
        });

        dataService.getFoodItems(function(response){
        $scope.foodItems = response.data;  //the response of fooditems goes in my scope fooditems
        });
        

        $scope.changeLocation = function (path) { //the function addLocation change the path in my url
                $location.path('/' + path)
            }        
        $scope.addIngredient = function(ingredient){ // I generate the scope with a function
                addItem('ingredients');             // and adding ingredients with the function addITEM
            }
        $scope.delIngredient = function(index){      ///// I generate the scope with the function for delete
                $scope.recipe.ingredients.splice(index, 1); ///this delete the ingredient in the array Ingredients
            }
        $scope.addStep = function(step){//the same of ingredients but with steps
                addItem('steps')
            }
        $scope.delStep = function(index){ //the same way to delete in ingredients
                $scope.recipe.steps.splice(index, 1);
            }    
        $scope.newRecipe = function (recipe) { // if recipe and recipe._id is available because the route is in /edit
            if (recipe && recipe._id) {        // the program use the putRecipe for update the values
                dataService.putRecipe(recipe, function (response) {
                    $location.path("/");      //and actualize with change of path
                }, errorHandler);
            } else {                          // if not recipe._id is available because the route is in /add
                dataService.postRecipe(recipe, function (response) {  // the program use the postRecipe add a new recipe
                    $location.path("/");      //and actualize with change of path
                }, errorHandler);            
            }
        };


        function addItem(name) {
            if ($scope.recipe === undefined) {  //if the scope is undefined the program create
                $scope.recipe = {};             //a object 
            }
            if ($scope.recipe[name] === undefined) { //if the scope is undefined the program create
                $scope.recipe[name] = [{}];           //array of objects
            } else {
                $scope.recipe[name].push({});  //if not the program push a object
            }
        }

        function errorHandler(reason) { //error handler function create one scope array for errors
            $scope.errors = [];
            for (let error in reason.data.errors) { //when one errorhandler is success this push the reason error inside of the array
                $scope.errors.push(reason.data.errors[error][0].userMessage);//for give the data necessary to the user
                console.log($scope.errors)
            }
        }

    };

})();