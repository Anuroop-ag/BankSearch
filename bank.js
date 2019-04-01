

var kolkata;
var delhi;
var hyd;
var chennai;
var mumbai;

function sortJSON(data, key) {
	return data.sort(function (a, b) {
			var x = a[key];
			var y = b[key];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}


function myFunction() {
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("showData");
	tr = table.getElementsByTagName("tr");
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[2];
		if (td) {
			// document.getElementById('NoData').innerHTML="";
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
				document.getElementById('NoData').innerHTML="";
			} else {
				tr[i].style.display = "none";
			}
		}
		else{
			document.getElementById('NoData').innerHTML="Sorry! There are no branches for your search query.";
		}      
	}
}
var count = 0;
function fetcher(){
	var loader = document.getElementById("loader");

	fetch("https://vast-shore-74260.herokuapp.com/banks?city=KOLKATA")
		.then(res => res.json() )
		.then(posts => {			
			posts = sortJSON(posts, 'bank_id');	
			kolkata=posts;
			count++;
			if(count == 5){
				loader.style.display = "none";
			}
		})
		
		fetch("https://vast-shore-74260.herokuapp.com/banks?city=DELHI")
		.then(res => res.json() )
		.then(posts => {			
			posts = sortJSON(posts, 'bank_id');	
			// displayTable(posts);
			delhi=posts;
			count++;
			if(count == 5){
				loader.style.display = "none";
			}
		})

		fetch("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
		.then(res => res.json() )
		.then(posts => {			
			posts = sortJSON(posts, 'bank_id');	
			// displayTable(posts);
			mumbai=posts;
			count++;
			if(count == 5){
				loader.style.display = "none";
			}
		})

		fetch("https://vast-shore-74260.herokuapp.com/banks?city=HYDERABAD")
		.then(res => res.json() )
		.then(posts => {			
			posts = sortJSON(posts, 'bank_id');	
			// displayTable(posts);
			hyd=posts;
			count++;
			if(count == 5){
				loader.style.display = "none";
			}
		})

		fetch("https://vast-shore-74260.herokuapp.com/banks?city=CHENNAI")
		.then(res => res.json() )
		.then(posts => {			
			posts = sortJSON(posts, 'bank_id');	
			chennai=posts;
			count++;
			if(count == 5){
				loader.style.display = "none";
			}
		})
	
}

function kolkataData(){

	if(kolkata){
		displayTable(kolkata);		
	}

}

function delhiData(){

	if(delhi){
		displayTable(delhi);		
	}
		
}

function mumbaiData(){

	if(mumbai){
		displayTable(mumbai);		
	}
}


function hydData(){

	if(hyd){
		displayTable(hyd);		
	}

}


function chennaiData(){

	if(chennai){
		displayTable(chennai);		
	}

}


function displayTable(data){
	
	if(data.length>0){

	

		var tableLimitter = document.createElement("div");
		tableLimitter.setAttribute('class', 'limiter');
		var tableContainer = document.createElement("div");
		tableContainer.setAttribute('class', 'container-table100');
		var wrapper = document.createElement("div");
		wrapper.setAttribute('class','wrap-table100');
		
		var tableDiv = document.createElement("div");
		tableDiv.setAttribute('class', 'table100 ver1 m-b-110');

		var tableHeadDiv = document.createElement("div");
		tableHeadDiv.setAttribute('class','table100-head');

		var tableHead = document.createElement("table");


		var thead = document.createElement("thead");

		var theadr = document.createElement("tr");

		theadr.setAttribute('class', 'row100 head');

		var col = [];
		for (var i = 0; i < data.length; i++) {
			for (var key in data[i]) {
					if (col.indexOf(key) === -1) {
							col.push(key);
					}
			}
		}

		for (var i = 0; i < col.length; i++) {
			var th = document.createElement("th");
			th.setAttribute("class",'cell100 column' + (i+1));
			th.innerHTML = col[i];
			theadr.appendChild(th);
		}

		thead.appendChild(theadr);
		tableHead.appendChild(thead);
		tableHeadDiv.appendChild(tableHead);

		var tableBodyDiv = document.createElement("div");
		tableBodyDiv.setAttribute("class",'table100-body');

		var tableBody = document.createElement("table");


		var tbody = document.createElement("tbody");

			
		
		// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
		for (var i = 0; i < data.length; i++) {
		
			var tbodyr = document.createElement("tr");
			tbodyr.setAttribute('class','row100 body')
			
			
			for (var j = 0; j < col.length; j++) {
				var td = document.createElement("td");
				td.innerHTML = data[i][col[j]];
				td.setAttribute("class",'cell100 column' + (j+1));

				
				tbodyr.appendChild(td);
			}
			tbody.appendChild(tbodyr)

		}
		tableBody.appendChild(tbody);	
		tableBodyDiv.appendChild(tableBody);
		tableDiv.appendChild(tableHeadDiv);
		tableDiv.appendChild(tableBodyDiv);
		
		wrapper.appendChild(tableDiv);
		tableContainer.appendChild(wrapper);
		tableLimitter.appendChild(tableContainer);
		// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
		var divContainer = document.getElementById("showData");
		divContainer.innerHTML = "";
		divContainer.appendChild(tableLimitter);
		
	}	

}



function retrieveData(value){

	if(value=="D"){
		delhiData();
	}
	if(value=="K"){
		kolkataData();
		//CreateTableFromJSON();
	}

	if(value=="M"){
		mumbaiData();
	}
	
	if(value=="C"){
		chennaiData();
	}
	

	if(value=="H"){
		hydData();
	}
	

}


