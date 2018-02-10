 (function() {
	"use strict";

	const getJokesButton = document.getElementById('getData');
	getJokesButton.addEventListener('click', getData);
	let favoriteJokes = document.getElementById('favorites');
	let listOfJokes = document.getElementById("list-of-jokes"); 

	// add to empty array before it will be pushed into localStorage
	let favorite = [];

	function displayFavorites() {
		let favoriteArray = listFavorite();
		let listOfFavorites = document.getElementById('favorites');
		let output = "";
		for (let i in favoriteArray) {
			output += `<li><input type="checkbox" id=${favoriteArray[i].jokeId}'/> User title: ${favoriteArray[i].jokeText}<input type="button" class="delete" value="Click Me"></li>`;
		}
		listOfFavorites.innerHTML = output;
		bindCheckBoxFavJoke(listOfFavorites.children);
	}

    // fetch data from api
	function getData() {
		fetch('https://api.icndb.com/jokes/random/10')
			.then(function(res) {
				return res.json();
		}).then(function(data) { 
			// variable is undefined because it is not initialized. Therefore at some empty single quotes
			let result = '';
			console.log(data.value);
			data.value.forEach((joke, index) => {
				result +=
				`<li><input type="checkbox" class='inputCheckbox' id='${joke.id}'/> User title :  ${joke.joke}<input type="button" class="delete" value="Click Me"></li>`;
				listOfJokes.innerHTML = result;
			});
			bindCheckboxJoke(listOfJokes.children);
		}).catch(function(err) {
			console.log(err);
		});
	}

	function clickedButton() {
		getJokesButton.setAttribute('disabled', 'disabled');
		getJokesButton.classList.add('opacity');
	}

	function bindCheckboxJoke(listOfJokes) {
		console.log(listOfJokes.length);
		for(let i = 0; i < listOfJokes.length; i++) {
			bindEventListeners(listOfJokes[i], addFavorite);
		}
	}

	function bindCheckBoxFavJoke(listOfFavorites) {
		for (let i = 0; favoriteJokes.length; i++) {
			bindEventListeners(favoriteJokes[i], removeFavorite);
		}
	}
	
	let bindEventListeners = function(jokeItem, checkBoxEventHandler) {
		let checkbox = jokeItem.querySelector('input[type="checkbox"]');
		let deleteButton = jokeItem.querySelector('.delete');
		
		checkbox.onchange = addFavorite;
		deleteButton.onchange = console.log('hello');

	}

	let addFavorite = function() {
		let id = this.id;
		let joke = this.parentNode.innerText;
		this.disabled = true;
		addJokeToFavorite(id, joke);
	}

	let removeFavorite = function() {

		let id = this.parentNode;
		let inputButton = this.parentNode.firstChild;
		inputButton.checked = false;
		inputButton.disabled = false;
		removeJokeFromFavorite(id);
	}

	let Item = function(jokeId, jokeText) {
		this.jokeId = jokeId
		this.jokeText = jokeText
	};

	function addJokeToFavorite(id, joke) {
		// check duplicates by iterating 
		for (let i in favorite) {
			if(favorite[i].id === id || favorite.length > 10) {
				console.log('stop');
				break;
			}
		}

		let norrisJoke = new Item(id, joke);

		if(favorite == null) {
    		favorite = [];
		}

		favorite.push(norrisJoke);
		saveFavorite();
		displayFavorites();
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
	
})();