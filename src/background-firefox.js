const webRequestListeners = new Set();

function webRequestHeaderModifier(details) {
  const {responseHeaders} = details;
  console.log('header receievd', responseHeaders, details);
  const header = responseHeaders.find(({name}) => name.toLocaleLowerCase() === 'content-type');
  if (header && header.value === 'text/html') {
    // Correct header is already set
    return;
  }
  if (header) {
    // Header is present, but has incorrect value
    header.value = 'text/html';
  } else {
    // Header is missing entirely
    responseHeaders.push({
      name: 'Content-Type',
      value: 'text/html',
    });
  }
  return {
    responseHeaders,
  };
}

function addHeaderFilter(tabId) {
  chrome.webRequest.onHeadersReceived.addListener(webRequestHeaderModifier, {tabId, urls: ["<all_urls>"]}, ["blocking", "responseHeaders"]);
  webRequestListeners.add(tabId);
  console.log('reloading')
  chrome.tabs.reload(tabId, {bypassCache: true});
}

function removeHeaderFilter(tabId) {
  if (webRequestListeners.delete(tabId) && webRequestListeners.size === 0) {
    chrome.webRequest.onHeadersReceived.removeListener(webRequestHeaderModifier);
  }
}

const createMapString = `(${createMap.toString()})()`;
function executeScripts(tabId) {
  chrome.tabs.executeScript(tabId, {code: createMapString},
      (result) => {
        if(!result[0]) return;
        chrome.tabs.insertCSS(tabId, {file: 'resources/map.css'});
        chrome.tabs.executeScript(tabId, {file: 'resources/webcomponents-bundle.js'}, () =>
          chrome.tabs.executeScript(tabId, {file: 'resources/importMapml.js'}, console.log));
  });
}
