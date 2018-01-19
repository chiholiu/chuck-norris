(function() {
	"use strict";

	const getJokesButton = document.getElementById('getData');
	getJokesButton.addEventListener('click', getData);
	
	// fetch data from api
	function getData() {
		fetch('http://api.icndb.com/jokes/random/10')
		.then(function(res) {
			return res.json()
		}).then(function(data) {
			console.log(data.value);
		}).catch(function(err) {
			console.log(err)
		})
		
		fetch('https://api.icndb.com/jokes/random/10')
		.then(res => res.json() )
		.then(data => { 

			console.log(data);
			let result;
			data.value.forEach((joke) => {
				result +=
				`<li><input type="checkbox"> User title : ${joke.joke}</li>
				`;
				document.getElementById('list-of-jokes').innerHTML = result;
			})
		}).catch((err)=>console.log(err))
	}

	let defaultList = document.getElementById('list-of-jokes');
	let favorite = document.getElementById('favorites');

	

	var completeTask = function(){
  
	  //GRAB THE CHECKBOX'S PARENT ELEMENT, THE LI IT'S IN
	  var listItem = this.parentNode;
	  console.log(listItem);
	  
	  //CREATE AND INSERT THE DELETE BUTTON
	  var deleteBtn = document.createElement("button"); // <button>
	  deleteBtn.innerText ="Delete"; 
	  deleteBtn.className = "delete";
	  listItem.appendChild(deleteBtn);
	  
	  //SELECT THE CHECKBOX FROM THE COMPLETED CHECKBOX AND REMOVE IT
	  var checkBox = listItem.querySelector("input[type=checkbox]");
	  checkBox.remove();
	  
	  //PLACE IT INSIDE THE COMPLETED LIST
	  favorite.appendChild(listItem); 
	  
	  //BIND THE NEW COMPLETED LIST
	  bindCompleteItems(listItem, deleteTask);
	};


	var deleteTask = function(){
	  console.log("Deleting task...");
	  
	  var listItem = this.parentNode;
	  var ul = listItem.parentNode;
	  
	  ul.removeChild(listItem);
	  
	};

	var bindIncompleteItems = function(taskItem, checkBoxClick){  
	  console.log("Binding the incomplete list...");
	  
	  //BIND THE CHECKBOX TO A VAR
	  var checkBox = taskItem.querySelector("input[type=checkbox]");
	  
	  //SETUP EVENT LISTENER FOR THE CHECKBOX
	  checkBox.onchange = checkBoxClick;  
	}; 

	//A FUNCTIONM THAT BINDS EACH OF THE ELEMTS IN THE COMPLETE LIST
	var bindCompleteItems = function(taskItem, deleteButtonPress){
	  console.log("Binding the complete list...");
	  
	  //BIND THE DELETE BUTTON
	  var deleteButton = taskItem.querySelector(".delete");
	   
	  //WHEN THE DELETE BUTTIN IS PRESSED, RUN THE deleteTask function
	  deleteButton.onclick = deleteButtonPress;
	    
	};

	var listItem = document.createElement("li");

	bindIncompleteItems(listItem, completeTask);


for(var i=0; i < defaultList.children.length; i++) {
  bindIncompleteItems(defaultList.children[i], completeTask);
}

for(var i=0; i < favorite.children.length; i++) {
  bindCompleteItems(favorite.children[i], deleteTask);
}

})();

