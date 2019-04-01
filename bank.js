

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
function fetcher(){

	fetch("https://vast-shore-74260.herokuapp.com/banks?city=KOLKATA")
		.then(res => res.json() )
		.then(posts => {			
			posts = sortJSON(posts, 'bank_id');	
			kolkata=posts;
		})
		
		fetch("https://vast-shore-74260.herokuapp.com/banks?city=DELHI")
		.then(res => res.json() )
		.then(posts => {			
			posts = sortJSON(posts, 'bank_id');	
			// displayTable(posts);
			delhi=posts;
		})

		fetch("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
		.then(res => res.json() )
		.then(posts => {			
			posts = sortJSON(posts, 'bank_id');	
			// displayTable(posts);
			mumbai=posts;
		})

		fetch("https://vast-shore-74260.herokuapp.com/banks?city=HYDERABAD")
		.then(res => res.json() )
		.then(posts => {			
			posts = sortJSON(posts, 'bank_id');	
			// displayTable(posts);
			hyd=posts;
		})

		fetch("https://vast-shore-74260.herokuapp.com/banks?city=CHENNAI")
		.then(res => res.json() )
		.then(posts => {			
			posts = sortJSON(posts, 'bank_id');	
			chennai=posts;
		})
	
}

function kolkataData(){


			displayTable(kolkata);
}

function delhiData(){

			displayTable(delhi);
		
}

function mumbaiData(){

			displayTable(mumbai);
}


function hydData(){

			displayTable(hyd);

}


function chennaiData(){

	
			displayTable(chennai);

}


function displayTable(data){
	
	if(data.length>0){
		
		var table = document.createElement("table");
		table.style.width = '20%';
		table.setAttribute('border', '1');
		table.setAttribute('cellspacing', '0');
		table.setAttribute('cellpadding', '0');
		
		// retrieve column header ('Name', 'Email', and 'Mobile')

		var col = [];
		for (var i = 0; i < data.length; i++) {
			for (var key in data[i]) {
					if (col.indexOf(key) === -1) {
							col.push(key);
					}
			}
		}
		
		// CREATE TABLE HEAD .
		var tHead = document.createElement("thead");	
			
		
		// CREATE ROW FOR TABLE HEAD .
		var hRow = document.createElement("tr");
		
		// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
		for (var i = 0; i < col.length; i++) {
				var th = document.createElement("th");
				th.innerHTML = col[i];
				hRow.appendChild(th);
		}
		tHead.appendChild(hRow);
		table.appendChild(tHead);
		
		// CREATE TABLE BODY .
		var tBody = document.createElement("tbody");	
		
		// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
		for (var i = 0; i < data.length; i++) {
		
				var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .
				
				
				for (var j = 0; j < col.length; j++) {
					var td = document.createElement("td");
					td.innerHTML = data[i][col[j]];
					bRow.appendChild(td);
				}
				tBody.appendChild(bRow)

		}
		table.appendChild(tBody);	
		
		
		// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
		var divContainer = document.getElementById("showData");
		divContainer.innerHTML = "";
		divContainer.appendChild(table);
		
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


