document.querySelectorAll('li').forEach(item => {
    item.addEventListener("click", event => {
        const content = item.textContent;
        let result = confirm(`Are you sure you want to delete ${content} from blocklist?`);
        if (result === true) {
            item.remove();
        }
    })
});