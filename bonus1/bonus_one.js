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

var array3 = []

function myFunction() {
	var xmlhttp = new XMLHttpRequest();
	var url = "http://www.mattbowytz.com/simple_api.json?data=all";
	var x = document.getElementById("search");
	console.log(x.value);

	if(array3.length === 0) {
		var parentMech = document.getElementById("resultsGoHere");
		var childMech = document.getElementById("results");
		if (typeof childMech !== 'undefined' && typeof parentMech !== 'undefined' && typeof childMech !== 'Node') {
			parentMech.innerHTML = ''
		}
	} else {
		var parentMech = document.getElementById("resultsGoHere");
		var trek = document.createElement("ul");
		trek.id = "results"
		parentMech.appendChild(trek);
	}

	array3 = []

	var parentEl = document.getElementById("dropdownSelect");
	var childEl = document.getElementById("newOption");
	if (typeof childEl !== 'undefined' && typeof parentEl !== 'undefined' && typeof childEl !== 'Node') {
		parentEl.innerHTML = ''
	}

	var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(x.value);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                var json = xhr.responseText;
				console.log(json);
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

				console.log(array3);

				var select = document.getElementById("dropdownSelect");
				
				for(var i = 0; i < array3.length; i++) {
					var opt = array3[i];
					var el = document.createElement("option");
					el.id = "newOption"
					el.textContent = opt;
					el.value = opt;
					el.setAttribute("size", array3.length);
					select.appendChild(el);
				}
 
            }
        }
    };
}

function results() {
	var parentEl = document.getElementById("results");
	var childEl = document.getElementById("result");
	if (typeof childEl !== 'undefined' && typeof parentEl !== 'undefined' && typeof childEl !== 'Node') {
		parentEl.innerHTML = ''
	}

	console.log("Here");

	var searchResults = document.getElementById("results");

	console.log(array3);

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