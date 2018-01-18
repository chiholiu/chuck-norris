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
		

		fetch('http://api.icndb.com/jokes/random/10')
            .then((res) => { return res.json() })
            .then((data) => { 
            	console.log(data.value);
                let result = '<h2> Chuck Norris Jokes </h2>';
                data.value.forEach((joke) => {
                    result +=
                     `<h4> User ID: ${joke.id} </h4>
                     <ul>
                       <li> User title : ${joke.joke}</li>
                    </ul>
                     `;
                document.getElementById('list-of-jokes').innerHTML = result;
                });
           }).catch((err)=>console.log(err))

		}

})();

