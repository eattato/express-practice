const request = (act, url, ct, body) => {
    let http = new XMLHttpRequest();
    http.open(act, url, false);
    http.setRequestHeader("Content-Type", ct);
    http.send(body);
    return http.responseText;
}

window.addEventListener("load", () => {
    let input = document.querySelector("#file");
    let button = document.querySelector("#button");

    button.addEventListener("click", () => {
        request("POST", "http://localhost:8888/crawl/", "application/json", JSON.stringify({
            "url": input.value
        }));
    });
});