function addHeaderFilter(tabId) {
  chrome.declarativeNetRequest.updateSessionRules({
    addRules: [{
      id: tabId,
      priority: 1,
      action: {
        type: "modifyHeaders",
        responseHeaders: [{
          header: "Content-Type",
          operation: "set",
          value: "text/html"
        }]
      },
      condition: {
        resourceTypes: ["main_frame"],
        "tabIds": [tabId]
      }
    }]
  }, () => chrome.tabs.reload(tabId));
}

function removeHeaderFilter(tabId) {
  try {
    // If document initially had "text/html" content type, we do not have a rule registered.
    chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [tabId]
    });
  } catch {};
}

function executeScripts(tabId) {
  chrome.scripting.executeScript({target: {tabId: tabId}, func: createMap},
      (result) => {
        if(!result[0].result) return;
        chrome.scripting.insertCSS({target: {tabId: tabId}, files: ['resources/map.css']});
        chrome.scripting.executeScript({target: {tabId: tabId}, files: ['resources/webcomponents-bundle.js',
            'resources/importMapml.js']});
  });
}
