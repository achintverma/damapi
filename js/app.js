(function($){

	var assets, filtered, sort_order = true;

	/*
	 * Make an AJAX Call to pull records 
	 */

	var xhttp = new XMLHttpRequest(); 
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       assets = JSON.parse(this.responseText);

	       // filter items with is_published true
	       filtered  = assets.filter(function(item){ 
	       		return (item.is_published === true);
	       });

	       // find any long text in description and truncate it
	       filtered.map(function(item){
	       		if(item.description.length > 100)
	       			item.description = item.description.substr(0, 100) + "...";
	       });

	       changeOrder();
	    }
	};

	xhttp.open("GET", "../data.json", true);
	xhttp.send();


	// Render the cards based on filtered & sorted records 
	var render = function(items){
		var html = ""; 
		for(var a of filtered){

	       		html += "<div class='card-wrapper'>\
		       				<div class='card'>\
		       					<img src='images/"+a.image_name+"'>\
		       					<div class='desc'>\
		       						<h5>"+a.title+"</h5>\
		       						<span>"+a.image_name+"</span>\
		       						<hr/>\
		       						<p>"+a.description+"</p>\
		       					<i class='material-icons'>favorite</i>\
								<i class='material-icons'>grade</i>\
								</div>\
		       				</div>\
	       				</div>";
	       }

	       document.getElementById('cards-container').innerHTML = html;
	}


	// Function to change the order of items. By default it runs to make order in reverse alphabetic	
	var changeOrder = function(){

		filtered.sort(function(a, b){
		 if(sort_order){	
       	 	return (a.title.toUpperCase() < b.title.toUpperCase()) ? 1 : -1;
       	 }
       	 else{
       	 	return (a.title.toUpperCase() < b.title.toUpperCase()) ? -1 : 1;
       	 }
       });

	   // switch the sorting order for next event	
	   sort_order = sort_order ? false : true;	
      
      // render the cards again after sorting 
	  render();
	}

	// bind click event with the sorting icon 
	document.getElementById("sort-icon").addEventListener("click", changeOrder);

})(window);