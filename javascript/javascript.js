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
				console.log(data);
			}).catch(function(err) {
				console.log(err)
			})
		}
})();

