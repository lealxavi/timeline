document.addEventListener('DOMContentLoaded',function () {
  chrome.tabs.query({active: true, currentWindow:true }, function (tabs) {
    document.getElementById("status").innerHTML = tabs[0].url;
  });
});