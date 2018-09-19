/*   * the array task will hold all the tasks.
	 * then the controller checks that is there any data available in local storage for use or not 
	 * we can not store anything in local storage as array etc, we can store anything only as string.
	 * an array [1,2,3] will be stored as "[1,2,3]"
	 * now to retrieve that data back as array, we use inbuilt library "JSON.parse",
	 * if we do not use it then getting an array from a string will be very complex code with for loops etc. 
	 * storing the data locally keeps the list in local storage,
	 * and thus even after a refresh, the list will be displayed on the screen 
*/

var app= angular.module('todoApp', []);

app.controller('todoCtrl', function($scope){
	$scope.tasks = []; 
	
	var taskData= localStorage['taskList']; 
	if(taskData!= undefined){
		$scope.tasks=JSON.parse(taskData);
	} 
	/* 
	 * searchEnter method also makes sure that if user clicks enter without entering any task, a blank task is not added in to-do list.
	 */
	$scope.searchEnter = function(){
		//console.log(event.which) and console.log(event.keyCode) both are same
		
		if(event.which == 13 && $scope.task!= "") {    
			$scope.addTask();
		}
	};
	
	 /* 
	  * the function addTAsk will
      * add that entered text into the list, 
      * display the list on container,  (this is done by using ng-repeat on tasks array in html)
      * and also remove the entered task from the text box, 
      * mark a task complete and make it visible differnetly on screen,
      * user should not be able to uncheck the completed task,
      * and remove it from the to-do list and displayed list as well
      */
	$scope.addTask=function(){  
		$scope.tasks.push({'taskMessage':$scope.task, 'status' : false});   /* the entered task (i.e the content of input box) is added to the tasks array*/
		 console.log($scope.tasks);
		$scope.task= '';                                                  /* after adding a task, the input box will be empty automatically */
		
		/* updating the local storage whenever there is a task added*
		 * method "stringify" converts array or object into string
		 */
		localStorage['taskList'] = JSON.stringify($scope.tasks);
		 console.log(localStorage);
	};
	
	/* 
	 * note that when this function is called, some the task from the lost has already been modified 
	 * but still the argument "msg" for method contentEdit and enterAgain is previous value of task
	 */
	$scope.contentEdit = function(msg){
		console.log(msg);
		console.log($scope.tasks);
		for(i=0;i<$scope.tasks.length ;i++){
			 /* 
			  * event.target.innerText will give  the updated value
			  */
			if($scope.tasks[i].taskMessage == msg){
				$scope.tasks[i].taskMessage = event.target.innerText; 
			}
		}
		 /* 
		  *  updating the local storage again, because few tasks have been updated
		  */
		localStorage['taskList'] = JSON.stringify($scope.tasks);  
		console.log($scope.tasks);
		 /* 
	     * this makes the tasks editable, however we need to wrote some code
	     * to perform an action on click of enter key, while user edits the task. we will use ng-keyup for that
	     * by default, by double click, it is saved but we need to save it on enter key press
	     */
	    event.target.contentEditable = event.target.contentEditable == "false" ? "true" : "false";
	};
	
	$scope.enterAgain = function(msg){
		if(event.which == 13 && msg!= "") {  
			$scope.contentEdit(msg);
		}
	};
});