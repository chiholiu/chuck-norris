 (function() {
	"use strict";
		
	const getJokesButton = document.getElementById('getData');
	getJokesButton.addEventListener('click', getData);

	loadLocalStorage();

	function loadLocalStorage() {
		let storage = JSON.parse(localStorage.getItem('favoList')) || [];
		let listOfFavorites = document.getElementById("favorites");
		let emptyArray = '';
		if(storage.length > 0) {
			for(var i = 0; i < storage.length; i++) {
				let idNumberJoke = storage[i].id;
				emptyArray += 
				`<li><input type="checkbox" id='${idNumberJoke}'/> User title: ${storage[i].joke}</li>`;
				listOfFavorites.innerHTML = emptyArray;
			}
		} else {
			return false;
		}
	}
	
	// fetch data from api
	function getData() {
		let listOfJokes = document.getElementById("list-of-jokes"); 

		fetch('https://api.icndb.com/jokes/random/10')
		.then(function(res) {
			return res.json();
		}).then(function(data) { 
			// variable is undefined because it is not initialized. Therefore at some empty single quotes
			let result = '';
			console.log(data.value);
			data.value.forEach((joke) => {
				result +=
				`<li><input type="checkbox" class='inputCheckbox' id='${joke.id}'/> User title :  ${joke.joke}</li>`;
				listOfJokes.innerHTML = result;
			});
			bindCheckbox();
		}).catch(function(err) {
			console.log(err);
		});
	}

	function clickedButton() {
		getJokesButton.setAttribute('disabled', 'disabled');
		getJokesButton.classList.add('opacity');
	}

	function bindCheckbox() {
		let inputCheckbox = document.querySelectorAll('input[type=checkbox]');
		let elems = document.getElementById('list-of-jokes').childNodes;
		let favoriteList = document.getElementById('favorites');
		let fav = JSON.parse(localStorage.getItem('favoList'))|| [];

		if(elems.length > 0) {	
			inputCheckbox.forEach(function(element, index) {
				inputCheckbox[index].addEventListener('change', function() {
					let joke = this;
					if(joke.checked && joke.parentNode.parentNode.id === 'list-of-jokes') { 
					   joke.checked = false;
					   favoriteList.appendChild(joke.parentNode);
					   addFavorite(joke.id, joke.parentNode.innerText, fav);
					} 
					if(joke.checked && joke.parentNode.parentNode.id === 'favorites') {
					   joke.checked = false;
					   removeFavorite(joke, index, fav);
					}
				});
			});
		}
		clickedButton();
	}

	function removeFavorite(favorite, index, fav) {
		let favoriteCheckBox = favorite;
		let i = index;

		// convert iterable object to an array, otherwise splice metho d would give an error.
		let favoriteListItem = Array.from(favoriteCheckBox.parentNode); 
		favoriteListItem.splice(i, 1);
		document.getElementById('list-of-jokes').appendChild(favorite.parentNode);
		localStorage.setItem('favoList', JSON.stringify(favoriteListItem));
	}

	// store favorites in localStorage
	function addFavorite(jokeId, jokeText, fav) {
		let norrisJoke = {
			id: jokeId,
			joke: jokeText
		};
		let favorites = fav;
		favorites.push(norrisJoke);
		// always get the object before the push method and pass it into stringify
		localStorage.setItem('favoList', JSON.stringify(favorites));
	}

})();