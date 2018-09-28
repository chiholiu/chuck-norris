(function() {
	"use strict";

	let listOfJokes = document.getElementById("list-of-jokes"); 
	let favoriteJokes = document.getElementById('favorites');
	let favorite = [];
	let favoriteArray;
	let autoAddJoke = false;
	let autoCall;

	function ChuckNorris() {
		// add to empty array before it will be pushed into localStorage
		this.init = function() {
			addEventListeners();
		}

		// fetch data from api
		let getData = function() {
			fetch('https://api.icndb.com/jokes/random/10')
				.then(function(res) {
					return res.json();
			}).then(function(data) { 
				// variable is undefined because it is not initialized. Therefore at some empty single quotes
				outputList(data);
				// loadButtons();
			}).catch(function(err) {
				console.log(err);
			});
		}

		let bindCheckboxJoke = function(listOfJokes) {
			for(let i = 0; i < listOfJokes.length; i++) {
				bindJokes(listOfJokes[i]);
			} 
		}

		let bindCheckBoxFavJoke = function(favoriteJokes) {
			for (let i = 0; i < favoriteJokes.length; i++) {
				bindFavoriteJokes(favoriteJokes[i]);
			} 	 
		}

		let bindJokes = function(jokeItem) {
			let checkbox = jokeItem.querySelector('input[type="checkbox"]');
			checkbox.addEventListener('change', addFavorite);
			getCheckboxes(checkbox);
		}

		let bindFavoriteJokes = function(jokeItem) {
			let deleteButton = jokeItem.querySelector('.delete');
			deleteButton.addEventListener('click', removeFavorite);
		}

		// console.log(bindCheckboxJoke());
		let outputList = function(data) {
			let result = '';
			data.value.forEach((joke, index) => {
				result +=
				`<li><input type="checkbox" class='inputCheckbox' id='${joke.id}'/> User title :  ${joke.joke}</li>`;
				listOfJokes.innerHTML = result;
			});
			bindCheckboxJoke(listOfJokes.children);
		}

		let listFavorite = function() {
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

		function clickedButton() {
			getJokesButton.setAttribute('disabled', 'disabled');
			getJokesButton.classList.add('opacity');
		}

		let addFavorite = function() {
			let id = this.id;
			console.log(this.id);
			let joke = this.parentNode.innerText;
			this.disabled = true;
			if(favorite === null) {
				favorite = [];
			}
			addJokeToFavorite(id, joke);
		}

		let displayFavorites = function() {
			favoriteArray = listFavorite();
			let output = "";

			for (let i in favoriteArray) {
				output += `<li><input type='button' class='delete' id='${favoriteArray[i].id}' value='remove'/></span> User title: ${favoriteArray[i].joke}</li>`;
			}
			
			favoriteJokes.innerHTML = output;
			bindCheckBoxFavJoke(favoriteJokes.children);
		}

		let removeJokeFromFavorite = function(id) {
			for (let i in favorite) {
				if(favorite[i].id === id) {
					favorite.splice(i, 1);
					break;
				}
			}
			removeDisabledCheckbox(id);
			saveFavorite();
			displayFavorites();
		}

		let removeFavorite = function() {
			if(event.target.classList.contains('delete')) {
				let removeItem = event.target;
				let id = removeItem.id;
				let inputButton = this.parentNode.firstChild;
				inputButton.checked = false;
				inputButton.disabled = false;
				removeJokeFromFavorite(id);
			}
		}

		let Item = function(jokeId, jokeText) {
			this.id = jokeId;
			this.joke = jokeText;
		}

		let disableAllInputs = function() {
			let inputs = listOfJokes.querySelectorAll("input:not(:checked)");
			for (let i = 0; i < inputs.length; i++) {
				if(inputs[i].disabled == false) {
					inputs[i].disabled = true;
				}
			}
		}

		let addJokeToFavorite = function(id, joke) {
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

		let removeDisabledCheckbox = function(id) {
			let inputs = listOfJokes.getElementsByTagName("input");
			for(var i = 0; i < inputs.length; i++) {
				if(inputs[i].id == id) {
					inputs[i].removeAttribute('disabled');
					inputs[i].checked = false;
					break;
				}
			}
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
		
		let interval;
		let speed = 1000; // speed of auto check 

		function autoAdd() {
			console.log('add');
			let inputs = listOfJokes.querySelectorAll("input:not(:checked)");
			let pickRandomJoke = inputs[Math.floor(Math.random() * inputs.length)];
			let id = pickRandomJoke.id;
			console.log(id);
			let joke = pickRandomJoke.parentNode.innerText;

			if(inputs.length === 0) return;
			pickRandomJoke.disabled = true;
			pickRandomJoke.checked = true;
			if(favorite === null) {
				favorite = [];
			}
			addJokeToFavorite(id, joke);
		}

		let autoAddStart = function() {
			autoAddJoke = true;
			if(autoAddJoke) {
				autoCall = setInterval(autoAdd, 5000);
			}
		}

		function autoAddStop() {
			clearInterval(autoCall);
			autoAddJoke = false;
		}


		// create new item so it would not iterate constantly like add 1, 1 and 2, 1, 2 and 3 and so on
		let RandomAdd = function(id) {
			this.id = id;
		}

		// in order to avoid resetting, you need to put the variable
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
		let addEventListeners = function() {
			const start = document.getElementById('start');
			const stop = document.getElementById('stop');
			const getJokesButton = document.getElementById('getData');
			const favorites = document.getElementById('favorites');
		
			getJokesButton.addEventListener('click', getData);
			favorites.addEventListener('click', removeFavorite);
			start.addEventListener('click', autoAddStart);
			stop.addEventListener('click', autoAddStop);
		}
	}

	let chuckNorris = new ChuckNorris();
	chuckNorris.init();

})();
