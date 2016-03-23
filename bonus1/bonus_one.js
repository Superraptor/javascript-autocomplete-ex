// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
	// Magic!
	console.log('Keepin\'n it clean with an external script!');
})();

function myFunction() {
	var xmlhttp = new XMLHttpRequest();
	var url = "http://www.mattbowytz.com/simple_api.json?data=all";
	var x = document.getElementById("search");

	var parentMech = document.getElementById("resultsGoHere");
	if (typeof parentMech !== 'undefined') {
		parentMech.innerHTML = ''
	}

	array3 = []

	if(x.value !== '') {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(x.value);
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				if(xhr.status === 200) {
					var json = xhr.responseText;
					var obj = JSON.parse(json);

					var array1 = obj["data"]["interests"];
					var array1Length = array1.length;

					var array2 = obj["data"]["programming"];
					var array2Length = array2.length;
					
					for(var i = 0; i < array1Length; i++) {
						if(array1[i].startsWith(capitalizeFirstLetter(x.value))) {
							array3.push(array1[i]);
						}
					}

					for(var i = 0; i < array2Length; i++) {
						if(array2[i].startsWith(capitalizeFirstLetter(x.value))) {
							array3.push(array2[i]);
						}
					}
					
					results(array3);
	 
				}
			}
		};
    }
}

function results(array3) {
	var parentEl = document.getElementById("resultsGoHere");
	var childEl = document.getElementById("result");
	if (typeof childEl !== 'undefined' && typeof parentEl !== 'undefined' && typeof childEl !== 'Node') {
		parentEl.innerHTML = ''
	}

	var searchResults = document.getElementById("resultsGoHere");

	for(var i = 0; i < array3.length; i++) {
		var opt = array3[i];
		var el = document.createElement("li");
		var a = document.createElement("a");
		el.id = "result";
		a.innerHTML = opt;
		a.setAttribute("href", "https://www.google.com/search?q=" + opt);
		searchResults.appendChild(el);
		el.appendChild(a);
	}
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}