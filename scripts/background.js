// importScripts("/main.js");

// import {websiteValidater} from "./main.js";

// chrome.runtime.onInstalled.addListener(() => {
//     ul {
//     padding: 0px;
// }
// }); 
// chrome.action.setBackgroundColor(
//     {color: [0, 255, 0, 0]},  // Green
//     () => { /* ... */ },
//   );

// chrome.storage.local.set({key: value}).then(() => {
//     console.log(websiteValidater('youtube.ca'));
// });

const arr = ["https://www.youtube.com"]
const extensions = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'

// chrome.action.onClicked.addListener(async (tab) => {
//   if (arr.has(tab.url)) {
//     document.body.style.backgroundColor = 'red';
//   }
// });
function reddenPage() {
  document.body.style.backgroundColor = 'red';
}

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes('google')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  }
});