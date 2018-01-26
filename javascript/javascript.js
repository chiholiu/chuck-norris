 (function() {
	"use strict";

	const getJokesButton = document.getElementById('getData');
	getJokesButton.addEventListener('click', getData);

	let incompleteTasksHolder = document.getElementById("list-of-jokes"); //incomplete-tasks
	let completedTasksHolder = document.getElementById("favorites"); //completed-tasks
	
	// fetch data from api
	function getData() {
		fetch('https://api.icndb.com/jokes/random/10')
		.then(function(res) {
			return res.json() 
		}).then(function(data) { 
			let result;
			console.log(data.value);
			data.value.forEach((joke) => {
				result +=
				`<li><input type="checkbox" id='${joke.id}'/> User title :  ${joke.joke}</li>
				`;
				document.getElementById('list-of-jokes').innerHTML = result;
			})
			bindCheckbox();
		}).catch(function(err) {
			console.log(err)
		})
	}

	function bindCheckbox(fav) {
		let inputCheckbox = document.querySelectorAll('input[type=checkbox]');
		let elems = document.getElementById('list-of-jokes').childNodes;
		let favoriteList = document.getElementById('favorites');

		if(elems.length > 0) {	
			inputCheckbox.forEach(function(element, index) {
				inputCheckbox[index].addEventListener('change', function() {
					let fav = JSON.parse(localStorage.getItem('favoList'))|| [];
					let joke = this;
					if(joke.checked && joke.parentNode.parentNode.id === 'list-of-jokes') { 
					   joke.checked = false;
					   favoriteList.appendChild(joke.parentNode);
					   addFavorite(joke.id, joke.parentNode.innerText, fav);
					} 
					if(joke.checked && joke.parentNode.parentNode.id === 'favorites') {
					   console.log(joke.id);
					   console.log(joke.parentNode.innerText);
					   removeFavorite(joke);
					}
				});
			});
		}
	}

	function removeFavorite(favorite) {
		let favoriteCheckBox = favorite;
		let favoriteListItem = favoriteCheckBox.parentNode; 
		console.log(favoriteListItem);
		favoriteListItem.remove();
		// localStorage.setItem('favoList', b); 
	}

	// store favorites in localStorage
	function addFavorite(jokeId, jokeText, fav) {
		let norrisJoke = {
			id: jokeId,
			joke: jokeText
		};
		let favorites = fav;
		favorites.push(norrisJoke);
		localStorage.setItem('favoList', JSON.stringify(favorites));
	}
})();

