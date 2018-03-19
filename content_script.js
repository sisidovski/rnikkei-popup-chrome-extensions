const url = new URL(location.href);
url.host = 'r.nikkei.com';
url.search = '';

chrome.runtime.sendMessage({url: url.toString()}, function(response) {});
