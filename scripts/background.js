chrome.runtime.onInstalled.addListener(() => {
  if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register('background.js')
  .then((registration) => {
    console.log('Service worker registered with scope:', registration);
  })
  .catch((error) => {
    console.error('Service worker failed', error);
  });}
});

let arr;

chrome.storage.local.get(["websiteKey"]).then((result) => {
  arr = result.websiteKey;
});

chrome.storage.local.onChanged.addListener(()=> {
  chrome.storage.local.get(["websiteKey"]).then((result) => {
    arr = result.websiteKey;
  });
})

self.addEventListener('message', function(event) {
  if (event.data.websiteKey) {
    arr = event.data.websiteKey;
  }
});

chrome.webNavigation.onCompleted.addListener((e) => {
    if (arr && arr.includes(websiteValidator(String(e.url)))) {
      chrome.tabs.update(e.Id, {url: "/onboarding.html"})
    };
    
  });

function websiteValidator(website) {
  const re = /([a-z]+\.)+([a-z]+\.*)*/g;
  let match = (website.match(re));
  if (match) {
      if (match[0].slice(0, 4) === 'www.') {
          return match[0].slice(4)
      }
      else {
          return match[0];
      }
  }
  return null;
}

chrome.webRequest.onBeforeRequest
