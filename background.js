// Whether to output log or not
let log = false;
// Regular expressions for IPs
const ipv4 = /(?:\d+\.){3}\d+/;
const ipv6 = /(?:[\w*]:)*:[\w*]/;

// Handlers
function handleRequest(requestInfo) {
  let tabId = requestInfo.tabId;
  let ip = requestInfo.ip;
  // Display ip as title (tooltip)
  browser.pageAction.setTitle({ tabId, title: ip });

  // Changing icon whether it's IPv4
  if (ipv4.test(ip)) {
    if (log)
      console.log("ipv4");
    browser.pageAction.setIcon({
      tabId,
      path: {
        16: "icons/v4-16.png",
        32: "icons/v4-32.png"
      }
    });
  }
  // Or IPv6
  else if (ipv6.test(ip)) {
    if (log)
      console.log("ipv6");
    browser.pageAction.setIcon({
      tabId,
      path: {
        16: "icons/v6-16.png",
        32: "icons/v6-32.png"
      }
    });
  }
  // Or neither
  else {
    if (log)
      console.log("Unrecognized IP");
    browser.pageAction.setIcon({
      tabId,
      path: {
        16: "icons/vX-16.png",
        32: "icons/vX-32.png"
      }
    });
  }

  // Toggle icon if it has disappeared
  browser.pageAction.show(ip);
}

function handleActivated(activeInfo) {
  // Toggle Icon so it keeps showing on active tab
  if (log)
    console.log("Toggle icon on active tab: " + activeInfo.tabId);
  browser.pageAction.show(activeInfo.tabId);
}

// Listeners
browser.webRequest.onCompleted.addListener(handleRequest, { urls: ["<all_urls>"], types: ["main_frame"] });
browser.tabs.onActivated.addListener(handleActivated);
