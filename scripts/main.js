const websiteSet = new Set(["netflix.com", "twitter.com", "instagram.com"]);

// should maybe fix this, but this adds an event listener to the default websites
document.querySelectorAll('li').forEach(item => {
     item.addEventListener("click", () => {
        const content = item.textContent;
        let result = confirm(`Are you sure you want to delete "${content}" from the blocklist?`);
        if (result === true) {
            websiteSet.delete(content);
            item.remove();
        }
    })
});

function websiteClick(website) {
    website.addEventListener("click", () => {
    const content = website.textContent;
    let result = confirm(`Are you sure you want to delete "${content}" from the blocklist?`);
    if (result === true) {
        websiteSet.delete(content);
        website.remove();
        }
    });
    }

function websitePrefix(prefix) {
    if (prefix === '') {
        return null;
    }
    let pre = '';
    for (i = 0; i < prefix.length; i++) {
        pre += prefix[i];
        if (prefix[i] === '/') {
            pre = '';
        }
    }
    return pre;
}

function websiteSuffix(suffix) {
    if (suffix === '') {
        return null;
    }
    let suff = '';
    for (i = 0; i < suffix.length; i++) {
        if (suffix[i] === '/') {
            break;
        }
        suff += suffix[i]
    }
    return suff;
}

function websiteValidater(website) {
    if (website === '') {
        return null;
    }
    else {
        const indexOfDot = website.indexOf('.');
        if (indexOfDot === -1) {
            return null;
        }
        const beforeDot = website.slice(0, indexOfDot);
        const afterDot = website.slice(indexOfDot + 1);
        const prefix = websitePrefix(beforeDot);
        const suffix = websiteSuffix(afterDot);
        if (prefix === null || suffix === null) {
            return null;
        }
        return prefix + '.' + suffix;
    }
}

const text = document.getElementById("userInput");
const btn = document.getElementById("buttonClick");
function addWebsite() {
    const output = document.getElementById("output");
    const website = websiteValidater(text.value);
    console.log(website);
    if (website === null) {
        output.innerHTML = "Please provide a valid website";
    }
    else if (websiteSet.has(website)) {
        output.innerHTML = "This website is already included in the blocklist";
    }
    else {
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(website));
        document.querySelector('ul').appendChild(node);
        output.innerHTML = `${website} was successfully added to the website blocklist`;
        websiteSet.add(website);
        websiteClick(node);
    }
};

btn.addEventListener("click", addWebsite);

const form = document.getElementById("form"); // works but should try to change it so you can add websites to blocklist using return key
function handleForm(returnKey) {
    returnKey.preventDefault();
}
form.addEventListener('submit', handleForm);

/* need to remove the item from local storage too*/