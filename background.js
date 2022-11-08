chrome.runtime.onInstalled.addListener(() => {
    if (details.reason == 'install') {
        chrome.tabs.create({
            url: "onboarding.html"
        });
    }
});

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
});

function checkProductivity(url) {
    if (url === "youtube.com") {
        url == "https://www.youtube.com/watch?v=60PbNFY2NHw";
    }
}

async function getCurrentTab(){
let tab = await getCurrentTab();

}