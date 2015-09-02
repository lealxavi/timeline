/*

#notes about linkedin experience structure

div #background-experience-container
	- .section-item <!-- All the experiencies -->
		- span.experience-date-locale <!-- Date range -->
		- h5 span.new-miniprofile-container strong a  <!-- Company -->
		- h4 a <!-- Rol --> 

*/

var userExperiencies = document.querySelectorAll('div #background-experience-container .section-item span.experience-date-locale time');

var elements = [];

for (var i = 0 ; i < userExperiencies.length; i++) {
	elements[i] = userExperiencies[i].innerHTML;
}

JSON.stringify(elements);