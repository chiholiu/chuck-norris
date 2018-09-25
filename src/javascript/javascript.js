(function() {
	"use strict";

	let listOfJokes = document.getElementById("list-of-jokes"); 
	let favorite = [];

	function ChuckNorris() {
		// add to empty array before it will be pushed into localStorage
		this.init = function() {
			addEventListeners();
		}

		let addEventListeners = function() {
			const getJokesButton = document.getElementById('getData');
			getJokesButton.addEventListener('click', getData);
		}

		// fetch data from api
		let getData = function() {
			fetch('https://api.icndb.com/jokes/random/10')
				.then(function(res) {
					return res.json();
			}).then(function(data) { 
				// variable is undefined because it is not initialized. Therefore at some empty single quotes
				let result = '';
				console.log(data.value);
				data.value.forEach((joke, index) => {
					result +=
					`<li><input type="checkbox" class='inputCheckbox' id='${joke.id}'/> User title :  ${joke.joke}</li>`;
					listOfJokes.innerHTML = result;
				});
				bindCheckboxJoke(listOfJokes.children);
				loadButtons();
			}).catch(function(err) {
				console.log(err);
			});
		}






		function displayFavorites() {
			let favoriteJokes = document.getElementById('favorites');
			let favoriteArray = listFavorite();
			let output = "";

			for (let i in favoriteArray) {
				output += `<li><input type='button' class='delete' id='${favoriteArray[i].id}' value='remove'/></span> User title: ${favoriteArray[i].joke}</li>`;
			}
			favoriteJokes.innerHTML = output;
			bindCheckBoxFavJoke(favoriteJokes.children);
		}

		

		function clickedButton() {
			getJokesButton.setAttribute('disabled', 'disabled');
			getJokesButton.classList.add('opacity');
		}

		function bindCheckboxJoke(listOfJokes) {
			for(let i = 0; i < listOfJokes.length; i++) {
				bindJokes(listOfJokes[i], addFavorite);
			} 
		}

		function bindCheckBoxFavJoke(favoriteJokes) {
			for (let i = 0; i < favoriteJokes.length; i++) {
				bindFavoriteJokes(favoriteJokes[i], removeFavorite);
			} 	 
		}
		
		let bindJokes = function(jokeItem, checkBoxEventHandler) {
			let checkbox = jokeItem.querySelector('input[type="checkbox"]');
			checkbox.addEventListener('change', addFavorite);
			getCheckboxes(checkbox);
		}

		let bindFavoriteJokes = function(jokeItem, checkBoxEventHandler) {
			let deleteButton = jokeItem.querySelector('.delete');
			deleteButton.addEventListener('click', removeFavorite);
		}

		let addFavorite = function() {
			let id = this.id;
			let joke = this.parentNode.innerText;
			this.disabled = true;
			if(favorite === null) {
				favorite = [];
			}
			addJokeToFavorite(id, joke);
		}

		let removeFavorite = function() {
			let id = this.id;
			let inputButton = this.parentNode.firstChild;
			inputButton.checked = false;
			inputButton.disabled = false;
			removeJokeFromFavorite(id);
		}

		let Item = function(jokeId, jokeText) {
			this.id = jokeId;
			this.joke = jokeText;
		}

		function addJokeToFavorite(id, joke) {
			let norrisJoke = new Item(id, joke);
			// because it starts with null by default, you will loop through an empty list
			const favIds = favorite.reduce((sum, element) => { 
					return sum.concat(element.id);
				}, 
			[]);

			if(favorite.length < 10 && !favIds.includes(id)) {
				favorite.push(norrisJoke);
			} else {
				disableAllInputs();
				console.log('id is the same and/ or length is bigger than 5');
				return;
			}
			saveFavorite();
			displayFavorites();
		}

		function disableAllInputs() {
			let inputs = listOfJokes.querySelectorAll("input:not(:checked)");
			
			for (let i = 0; i < inputs.length; i++) {
				if(inputs[i].disabled == false) {
					inputs[i].disabled = true;
				}
			}
		}

		function removeJokeFromFavorite(id) {
			for (let i in favorite) {
				if(favorite[i].id === id) {
					favorite.splice(i, 1);
					break;
				}
			}
			saveFavorite();
			displayFavorites();
		}

		function listFavorite() {
			let favoriteCopy = [];
			for (let i in favorite) {
				let jokes = favorite[i];
				let jokesCopy = {};

				// using copy will avoid any strange error like accidentially overwriting some array, so therefore never use references in this case
				for (let p in jokes) {
					jokesCopy[p] = jokes[p];
				}
				favoriteCopy.push(jokesCopy);
			}
			return favoriteCopy;
		}		

		function saveFavorite() {
			localStorage.setItem('favoList', JSON.stringify(favorite));
		}

		function loadFavorites() {
			favorite = JSON.parse(localStorage.getItem('favoList'));
		}

		// You have to load the JSOn of course before 
		loadFavorites();
		displayFavorites();

		let start = document.getElementById('start');
		let stop = document.getElementById('stop');
		let pause = false;

		function loadButtons() {
			start.addEventListener('click', autoAddStart);
			stop.addEventListener('click', autoAddStop);
		}
		
		let interval;
		let speed = 1000; // speed of auto check 

		function autoAddStart() {
			interval = setInterval(autoRandom, speed);	
			return false;
		}

		function autoAddStop() {
			clearInterval(interval);
			return false;
		}

		// create new item so it would not iterate constantly like add 1, 1 and 2, 1, 2 and 3 and so on
		let RandomAdd = function(id) {
			this.id = id;
		}

		// in order to avoid resetting, you need to put the varia
		let array = [];

		function getCheckboxes(checkbox) {
			let addRandomCheckbox = new RandomAdd(checkbox);
			array.push(addRandomCheckbox);
		}

		function autoRandom() {
			let randomNumber = Math.floor(Math.random() * Math.floor(array.length));
			let randomJoke = array[randomNumber].id.id;
			let jokeElement = document.getElementById(randomJoke);
			let index = array.indexOf(array[randomNumber]);

			if(array.length <= 1) {
				autoAddStop();
			}
			
			array.splice(index, 1);
			jokeElement.click();
		}	
	}

	let chuckNorris = new ChuckNorris();
	chuckNorris.init();

})();
