//https://developer.chrome.com/extensions/api_index

function getUserName(tabId) {
	chrome.tabs.executeScript(tabId,{ code : "document.querySelector('#name .full-name').innerHTML" },function(results) {
		console.log(results);
	});
}

document.addEventListener('DOMContentLoaded',function () {
  chrome.tabs.query({active: true, currentWindow:true }, function (tabs) {
    getUserName(tabs[0].id);
  });
});