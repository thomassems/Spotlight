let savedWebsites;

function initializeDefaultWebsites() {
    chrome.storage.local.get(["websiteKey"], (result) => {
        if (Object.keys(result).length === 0) {
            const defaultWebsites = ["netflix.com", "twitter.com", "instagram.com", "facebook.com","tiktok.com", "primevideo.com", "hulu.com", "amazon.com", "youtube.com", "pinterest.com"];
            chrome.storage.local.set({ websiteKey: defaultWebsites }, () => {
                console.log("Default websites have been initialized.");
            });
        } else {
            savedWebsites = result.websiteKey;
        }
        result.websiteKey.forEach(addSite);
    });
}

initializeDefaultWebsites();

function websiteClick(website) {
    website.addEventListener("click", () => {
        clickedWebsite(website);
    });
}

function websiteValidator(website) {
    const re = /([a-z]+\.)+([a-z]+\.*)/g;
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

function addSite(site) {
    let node = document.createElement('li');
    node.appendChild(document.createTextNode(site));
    document.querySelector('ul').appendChild(node);
    websiteClick(node);
}

const btn = document.getElementById("buttonClick");
btn.addEventListener("click", addWebsite);

const form = document.getElementById("form");
function handleForm(returnKey) {
    returnKey.preventDefault();
}

form.addEventListener('submit', handleForm);

function clickedWebsite(websiteObj) {
    const content = websiteObj.textContent;
    let result = confirm(`Are you sure you want to delete "${content}" from the blocklist?`);
        if (result === true) {
            let index = savedWebsites.indexOf(content);
            savedWebsites.splice(index, 1);
            chrome.storage.local.set({websiteKey:savedWebsites});
            websiteObj.remove();
            document.getElementById("output").innerHTML='';
        }
}

const text = document.getElementById("userInput");
function addWebsite() {
    const output = document.getElementById("output");
    const website = websiteValidator(text.value);
    if (website === null) {
        output.innerHTML = "Please provide a valid website";
    }
    else if (savedWebsites.includes(website)) {
        output.innerHTML = "This website is already included in the blocklist";
    }
    else {
        savedWebsites.push(website);
        addSite(website);
        chrome.storage.local.set({websiteKey:savedWebsites});
        output.innerHTML = `${website} was successfully added to the website blocklist`;
    }
}