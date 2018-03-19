const getRNikkeiURL = wwwURL => {
  const convert = (obj, articleId = null) => {
    obj.host = 'r.nikkei.com';
    obj.search = '';
    if (articleId) {
      obj.pathname = `/article/${articleId}`;
    }
    return obj.toString();
  };
  const getArticleId = obj => {
    const param = url.searchParams.get('ng');
    return param.indexOf('DG') === -1 ? null : param;
  };

  const url = new URL(wwwURL);
  if (/^\/article\/.+/.test(url.pathname)) {
    return convert(url);
  }

  const articleId = getArticleId(url);
  return articleId ? convert(url, articleId) : null;
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  chrome.pageAction.show(sender.tab.id);
  sendResponse({tabid: sender.tab.id});
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.getSelected(null, activeTab => {
    const RNikkeiURL = getRNikkeiURL(activeTab.url);
    if (RNikkeiURL) {
      window.open(RNikkeiURL, '', 'width=350, height=600');
    }
  });
});
