//https://developer.chrome.com/extensions/api_index

function getUserName(tabId) {
	chrome.tabs.executeScript(tabId,{ file : "linkedin-scraping.js", allFrames : true },function(results) {
		console.log(results);
	});
}

document.addEventListener('DOMContentLoaded',function () {
  chrome.tabs.query({active: true, currentWindow:true }, function (tabs) {
    getUserName(tabs[0].id);
  });
});