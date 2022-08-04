const request = (act, url, ct, body) => {
    var http = new XMLHttpRequest();
    http.open(act, url, false);
    http.setRequestHeader("Content-Type", ct);
    http.send(body);
    return http.responseText;
}

const keyInput = (act, input) => {
    if (act == "remove") {
        input = input.substring(0, input.length - 1);
    } else if (act == "ac") {
        input = "";
    } else if (act == "calculate") {
        let result = request("POST", "http://localhost:8888/operation", "text/plain", input);
        input = result;
        if (isNaN(result) == true) {
            removeOnEnter = true;
        }
    }
    return input;
}

var removeOnEnter = false;

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
                let specialClasses = ["remove", "ac", "calculate"];
                for (let ind in specialClasses) {
                    if (button.classList.contains(specialClasses[ind])) {
                        input = keyInput(specialClasses[ind], input);
                    }
                }
            } else {
                if (removeOnEnter == true) {
                    removeOnEnter = false;
                    input = "";
                }
                input = input + button.innerHTML;
            }
            inputDisplay.innerHTML = input;
        });
    }

    document.addEventListener('keydown', (event) => {
        let keyActs = {
            8: "remove",
            13: "calculate",
            61: "calculate"
        }
        if (event.keyCode >= 48 && event.keyCode <= 57) {
            if (removeOnEnter == true) {
                removeOnEnter = false;
                input = "";
            }
            input = input + String.fromCharCode(event.keyCode);
        } else if (event.keyCode in keyActs) {
            input = keyInput(keyActs[event.keyCode], input);
        }
        inputDisplay.innerHTML = input;
    });
});