const websiteSet = new Set(["netflix.com", "twitter.com", "instagram.com"]);

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

function websiteValidaterandTruncater(website) {
    if (website === '') {
        return null;
    } 
    else {
        const indexOfDot = website.indexOf('.');
        if (indexOfDot === -1) {
            return null;
        } 
        else {
            let website_string = '';
            const beforeDot = website.slice(0, indexOfDot);
            const afterDot = website.slice(indexOfDot + 1);
            for (i = 0; i < beforeDot.length; i++) {
                if (beforeDot[i] === '/') {
                    website_string = '';
                }
                else {
                    website_string += beforeDot[i]
                }
            }

            website_string += '.';

            for (j = 0; j < afterDot.length; j++) {
                if (afterDot[j] === '/') {
                    break;
                };
                website_string += afterDot[j];
            }
            return website_string;
        }
    }

};

const text = document.getElementById("userInput");
const btn = document.getElementById("buttonClick");
function addWebsite() {
    const output = document.getElementById("output");
    const website = websiteValidaterandTruncater(text.value);
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
    }
};

btn.addEventListener("click", addWebsite);

const form = document.getElementById("form"); // works but should try to change it so you can add websites to blocklist using return key
function handleForm(returnKey) {
    returnKey.preventDefault();
}
form.addEventListener('submit', handleForm);

/* need to remove the item from local storage too*/