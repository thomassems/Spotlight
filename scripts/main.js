if (localStorage.getItem("websiteArray") === null) {
    const websiteArr = ["netflix.com", "twitter.com", "instagram.com"];
    const stringArr = JSON.stringify(websiteArr);
    localStorage.setItem('websiteArray', stringArr);
}

let websitesFromStorage = localStorage.getItem('websiteArray');
let arrayParsed = JSON.parse(websitesFromStorage);
arrayParsed.forEach(addSite);

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
            const index = parsed.indexOf(content);
            parsed.splice(index, 1);
            stringArray = JSON.stringify(parsed);
            localStorage.setItem('websiteArray', stringArray);
            websiteObj.remove();
            document.getElementById("output").innerHTML='';
        }
}

function websiteValidator(website) {
    const re = /([a-z]+\.)+([a-z]+\.*)*/g;
    let match = (website.match(re))[0];
    console.log(match.slice(0, 4));
    if (match) {
        if (match.slice(0, 4) === 'www.') {
            return match.slice(4)
        }
        else {
            return match;
        }
    }
    return null;
}

const text = document.getElementById("userInput");
const btn = document.getElementById("buttonClick");
function addWebsite() {
    const output = document.getElementById("output");
    const website = websiteValidator(text.value);
    let storedArray = localStorage.getItem('websiteArray');
    if (website === null) {
        output.innerHTML = "Please provide a valid website";
    }
    else if (storedArray.includes(website)) {
        output.innerHTML = "This website is already included in the blocklist";
    }
    else {
        let storedParsed = JSON.parse(storedArray);
        storedParsed.push(website);
        addSite(website);
        let websiteArra = JSON.stringify(storedParsed);
        localStorage.setItem('websiteArray', websiteArra)
        output.innerHTML = `${website} was successfully added to the website blocklist`;
    }
}

function addSite(site) {
    let node = document.createElement('li');
    node.appendChild(document.createTextNode(site));
    document.querySelector('ul').appendChild(node);
    websiteClick(node);
}

btn.addEventListener("click", addWebsite);

const form = document.getElementById("form");
function handleForm(returnKey) {
    returnKey.preventDefault();
}
form.addEventListener('submit', handleForm);