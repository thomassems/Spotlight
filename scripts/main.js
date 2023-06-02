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
    // need to check if it starts with http, and if it does, then the website name starts after the first "."
    // otherwise the website starts at the beginning of the text
    // no matter what, website ends at the character before a backslash if there is one, and if it starts at http, then
    // this function will be called upon when determining whether a website should be added or not, and it's value will be used
    // as an element in the webpage
    if (website === '') {
        return null;
    }

}

const text = document.getElementById("userInput");
const btn = document.getElementById("buttonClick");


function addWebsite() {
    const output = document.getElementById("output");
    // const website = websiteValidaterandTruncater(text.value)
    // if website === null || websiteSet.had(website) {
    if (text.value === '' || websiteSet.has(text.value) || websiteValidaterandTruncater(text.value) === null) {
        output.innerHTML = `Please provide a valid website`;
    }
    else {
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(text.value));
        document.querySelector('ul').appendChild(node);
        output.innerHTML = `${text.value} was successfully added to the website blocklist`;
        websiteSet.add(text.value);
    }
};
btn.addEventListener("click", addWebsite);

const form = document.getElementById("form"); // works but should try to change it so you can add websites to blocklist using return key
function handleForm(returnKey) {
    returnKey.preventDefault();
}
form.addEventListener('submit', handleForm);

/* need to remove the item from local storage too*/