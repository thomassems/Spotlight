document.querySelectorAll('li').forEach(item => {
    item.addEventListener("click", event => {
        const content = item.textContent;
        let result = confirm(`Are you sure you want to delete ${content} from blocklist?`);
        if (result === true) {
            item.remove();
        }
    })
});

const text = document.getElementById("userInput");
const btn = document.getElementById("buttonClick");
function addWebsite() {
    var node = document.createElement('li');
    node.appendChild(document.createTextNode(text.value));
    document.querySelector('ul').appendChild(node);
    const output = document.getElementById("output");
    output.innerHTML = `${text.value} was successfully added to the website block list`;
};
btn.addEventListener("click", addWebsite);


/* need to remove the item from local storage too*/