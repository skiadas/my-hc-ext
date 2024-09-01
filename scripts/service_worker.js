const POLICIES_ORIGIN = 'https://policies.hanover.edu';

// chrome.sidePanel
//   .setPanelBehavior({ openPanelOnActionClick: true })
//   .catch((error) => console.error(error));

chrome.action.onClicked.addListener(async (tab) => {
  console.log(tab.url);
  console.log(tab.url == "https://my.hanover.edu/ICS/Academic/Registrar_Faculty/Faculty_Manual.jnz");
  if (tab.url.startsWith(POLICIES_ORIGIN) || tab.url == "https://my.hanover.edu/ICS/Academic/Registrar_Faculty/Faculty_Manual.jnz") {
    const frame = (await chrome.webNavigation.getAllFrames({ tabId: tab.id }))
              .find(details => details.url.startsWith(POLICIES_ORIGIN));
    const target = { tabId: tab.id };
    if (frame) { target.frameIds = [frame.frameId]; }
    await chrome.scripting.executeScript({
      files: ["scripts/policy_search.js"],
      target: target
    });
    chrome.scripting.insertCSS({
      files: ["policies.css"],
      target: target
    })
  }
});

// chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
//   console.log(tabId, info, tab);
//   if (!tab.url) {
//         await chrome.sidePanel.setOptions({
//       tabId,
//       enabled: false
//     });
//     return
//   }
//   const url = new URL(tab.url);
//   // Enables the side panel on google.com
//   if (url.origin === POLICIES_ORIGIN) {
//     await chrome.sidePanel.setOptions({
//       tabId,
//       path: 'sidepanel.html',
//       enabled: true
//     });
//   } else {
//     // Disables the side panel on all other sites
//     await chrome.sidePanel.setOptions({
//       tabId,
//       enabled: false
//     });
//   }
// });
