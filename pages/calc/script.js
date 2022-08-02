const request = (act, url, ct, body) => {
    var http = new XMLHttpRequest();
    http.open(act, url, false);
    http.setRequestHeader("Content-Type", ct);
    http.send(body);
    return http.responseText;
}

window.addEventListener('load', function () {
    var input = "";
    var inputDisplay = document.querySelector(".input");
    var buttons = document.querySelectorAll("td");
    var specialButtons = ["remove", "input", "pm", "calculate", "ac"];
    for (let ind = 0; ind < buttons.length; ind++) {
        let button = buttons[ind];
        button.addEventListener("click", () => {
            let special = false;
            for (let ind = 0; ind < specialButtons.length; ind++) {
                if (button.classList.contains(specialButtons[ind])) {
                    special = true;
                    break;
                }
            }
            if (special == true) {
                if (button.classList.contains("remove")) {
                    input = input.substring(0, input.length - 1);
                } else if (button.classList.contains("ac")) {
                    input = "";
                } else if (button.classList.contains("calculate")) {
                    input = request("POST", "http://localhost:8888/operation", "text/plain", input);
                }
            } else {
                input = input + button.innerHTML;
            }
            inputDisplay.innerHTML = input;
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.keyCode >= 48 && event.keyCode <= 57) {
            input = input + String.fromCharCode(event.keyCode);
            inputDisplay.innerHTML = input;
        }
    });
});