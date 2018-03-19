let url = '';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  url = request.url;
  chrome.pageAction.show(sender.tab.id);
  sendResponse({tabid: sender.tab.id});
});

chrome.pageAction.onClicked.addListener(function(tab) {
  window.open(url, '', 'width=350, height=600');
});
