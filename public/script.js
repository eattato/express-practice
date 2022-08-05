const request = (act, url, ct, body) => {
    let http = new XMLHttpRequest();
    http.open(act, url, false);
    // http.setRequestHeader("Content-Type", ct);
    http.send(body);
    return http.responseText;
}

window.addEventListener("load", () => {
    let input = document.querySelector("#file");
    let label = document.querySelector("#label");
    let button = document.querySelector("#button");
    let file = null;
    
    input.addEventListener("change", () => {
        file = input.files[0];
        button.innerHTML = file.name;
        button.style.display = "block";
        label.style.display = "none";
    });

    let sended = false;
    button.addEventListener("click", () => {
        if (sended == false && file != null) {
            sended = true;
            
            let body = JSON.stringify({
                "extension": "png"
            });

            let formData = new FormData();
            formData.append("file", file, "file");
            formData.append("body", body);
            request("POST", "http://localhost:8888/public/", "multipart/form-data", formData);
        }
    });
});