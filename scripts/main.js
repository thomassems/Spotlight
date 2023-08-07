if (localStorage.getItem("websiteArray") === null) {
    const websiteArr = ["netflix.com", "twitter.com", "instagram.com"];
    const stringArr = JSON.stringify(websiteArr);
    localStorage.setItem('websiteArray', stringArr);
}
let websitesFromStorage = localStorage.getItem('websiteArray');
let arrayParsed = JSON.parse(websitesFromStorage);


for (let i =0; i < arrayParsed.length; i ++) {
    if (arrayParsed[i] != null) {
        addSite(arrayParsed[i]);
    }
}

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
            let arr = localStorage.getItem('websiteArray');
            let parsed = JSON.parse(arr);
            for (let i = 0; i < parsed.length; i++) {
                if (parsed[i] === content) {
                    delete parsed[i];
                }
        }
            stringArray = JSON.stringify(parsed);
            localStorage.setItem('websiteArray', stringArray);
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
    else if (arrayParsed.has(website)) {
        output.innerHTML = "This website is already included in the blocklist";
    }
    else {
        let node = document.createElement('li');
        node.appendChild(document.createTextNode(website));
        document.querySelector('ul').appendChild(node);
        arrayParsed.push(website);
        let websiteArra = JSON.stringify(arrayParsed);
        localStorage.setItem('websiteArray', websiteArra)
        websiteClick(node);
        output.innerHTML = `${website} was successfully added to the website blocklist`;
    }
}

function addSite(site) {
    let node = document.createElement('li');
    node.appendChild(document.createTextNode(site));
    document.querySelector('ul').appendChild(node);
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

// idea: save an array in local storage that has the 3 websites. Once those 3 websites have been added to local storage, remove the first array from local storage.
// then you will just display whatever is in the 2nd local storage