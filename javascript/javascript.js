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
			let result;
			data.value.forEach((joke) => {
				result +=
				`<li><input type="checkbox" id='${joke.id}'/> User title :  ${joke.joke}</li>
				`;
				document.getElementById('list-of-jokes').innerHTML = result;
			})
			bindCheckbox();
		}).catch((err)=>console.log(err))
	}

	function bindCheckbox(event) {
		let defaultList = document.getElementById('list-of-jokes');
		let favorite = document.getElementById('favorites');
		let elems = defaultList.childNodes;
		let inputCheckbox = document.querySelectorAll('input[type=checkbox]');

		if(elems.length > 0) {
			console.log('loaded');
			
			inputCheckbox.forEach(function(element, index) {
				inputCheckbox[index].addEventListener('change', function() {
					console.log(this.nextElementSibling.id);
					let $this = $(this),
						i = $this.closest('li').index(),
						$target = $(favorite);
					if (!this.checked) {
						$target = $(defaultList);
	            		console.log('a');
					} else {
						console.log($this.data('idx', i));
					}

					let $targetLi = $target.find('li:eq(' + $this.data('idx') + ')');
  
			        if ($targetLi.length) {
			            $target.find('li:eq(' + $this.data('idx') + ')').before($this.closest('li'));
			        } else {
			            $target.append($this.closest('li'));
			        
			        }
			        var html = $(favorite).html();
			        console.log(html);
				})
			
			});
		}
	}
})();

