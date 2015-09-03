/*

#notes about linkedin experience structure

div #background-experience-container
	- .section-item <!-- All the experiencies -->
		- span.experience-date-locale <!-- Date range -->
		- h5 span.new-miniprofile-container strong a  <!-- Company -->
		- h4 a <!-- Rol --> 

*/

function presentDate() {
	var month = new Date().getMonth();
	return (month<10?"0":"") + month.toString() + "/" + new Date().getFullYear();	
}

function parseLinkedInDate(linkedinDate) {
		var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
		var month = months.indexOf(linkedinDate.split(" ")[0]) + 1;
		var year  = linkedinDate.split(" ")[1];
		return (month<10?"0":"") + month.toString() + "/" + year;
}

var userExperiencies = document.querySelectorAll('div #background-experience-container .section-item');

var elements = {};

for (var i = 0 ; i < userExperiencies.length; i++) {
	
	elements[i] = {};

	var times = userExperiencies[i].querySelectorAll("span.experience-date-locale time");
	
	if (times.length === 1) {
		elements[i].begin = parseLinkedInDate(times[0].innerHTML);
		elements[i].end = presentDate();
	} else if (times.length === 2) {
		elements[i].begin = parseLinkedInDate(times[0].innerHTML);
		elements[i].end   = parseLinkedInDate(times[1].innerHTML);
	} else {
		throw "We can handle more than two dates";
	}

}

JSON.stringify(elements);