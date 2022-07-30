// Valid JSON can not contain undefined, so we use a JS module instead.
module.exports = {
  manifest_version: 2,
  permissions: [
    "storage",
    "scripting",
    "unlimitedStorage",
    "tabs",
    "webRequest",
    "webRequestBlocking",
    "<all_urls>",
  ],
  host_permissions: undefined,
  action: undefined,
  browser_action: {
    default_popup: "popup.html",
  },
  background: {
    scripts: [
      "background.js",
    ],
  },
  web_accessible_resources: [
    "dist/*",
    "resources/*",
  ],
};
