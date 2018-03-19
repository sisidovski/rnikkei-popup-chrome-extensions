const getRNikkeiURL = wwwURL => {
  const url = new URL(wwwURL);
  url.host = 'r.nikkei.com';
  url.search = '';
  return url.toString();
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  chrome.pageAction.show(sender.tab.id);
  sendResponse({tabid: sender.tab.id});
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.getSelected(null, activeTab => {
    window.open(getRNikkeiURL(activeTab.url), '', 'width=350, height=600');
  });
});
