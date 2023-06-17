const websiteSet = new Set(["netflix.com", "twitter.com", "instagram.com"]);

document.querySelectorAll('li').forEach(item => {
     item.addEventListener("click", () => {
        clickedWebsite(item);
    })
});

function websiteClick(website) {
    website.addEventListener("click", () => {
        clickedWebsite(website);
    });
}

function clickedWebsite(websiteObj) {
    const content = websiteObj.textContent;
    let result = confirm(`Are you sure you want to delete "${content}" from the blocklist?`);
        if (result === true) {
            websiteSet.delete(content);
            websiteObj.remove();
            document.getElementById("output").innerHTML='';
        }
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
    if (!suffix) {
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
    if (!website) {
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
    if (website === null) {
        output.innerHTML = "Please provide a valid website";
    }
    else if (websiteSet.has(website)) {
        output.innerHTML = "This website is already included in the blocklist";
    }
    else {
        let node = document.createElement('li');
        node.appendChild(document.createTextNode(website));
        document.querySelector('ul').appendChild(node);
        output.innerHTML = `${website} was successfully added to the website blocklist`;
        websiteSet.add(website);
        websiteClick(node);
    }
}

btn.addEventListener("click", addWebsite);

const form = document.getElementById("form");
function handleForm(returnKey) {
    returnKey.preventDefault();
}
form.addEventListener('submit', handleForm);

// const memeImage = document.querySelector("img");

// myImage.onclick = () => {
//   const src = memeImage.getAttribute("src");
//   if (src === "images/onboarding1.jpg") {
//     memeImage.setAttribute("src", "images/onboarding2.jpg");
//   }
//   else if (src === "images/onboarding2.jpg") {
//     memeImage.setAttribute("src", "images/onboarding3.jpg");
//   } 
//   else if (src === "images/onboarding3.jpg") {
//     memeImage.setAttribute("src", "images/onboarding4.jpg");
//   }
//   else if (src === "images/onboarding4.jpg") {
//     memeImage.setAttribute("src", "images/onboarding5.jpg");
//   }
//   else if (src === "images/onboarding5.jpg"){
//     memeImage.setAttribute("src", "images/onboarding6.jpg");
//   }
//   else{
//     memeImage.setAttribute("src", "images/onboarding1.jpg");
//   }
// }
