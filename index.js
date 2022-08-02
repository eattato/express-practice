const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const { resolveSoa } = require("dns");
const e = require("express");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());

String.prototype.format = function() {
    var result = this;
    for (let ind in arguments) {
        result = result.replace("{}", arguments[ind]);
    }
    return result;
}

String.prototype.multiSplit = function() {
    // arguments = seperator
    var origin = this;
    let seperator = Array.from(arguments);
    let split = [];
    let current = "";
    for (let ind = 0; ind < origin.length; ind++) {
        let char = origin.charAt([ind]);
        if (seperator.indexOf(char) == -1) {
            // string splitted
            current = current + char;
            if (ind == origin.length - 1) { // 마지막이라면
                split.push(current);
                current = "";
            }
        } else {
            // seperator
            if (current.length != 0) {
                split.push(current); // 이전에 완성된 문자열을 넣어줌
            }
            split.push(char); // 자기 자신을 넣어줌
            current = "";
        }
    }
    return split;
}

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/umjunsik", (req, res) => {
    let param = req.query.is;
    if (param == null) {
        param = "awesome";
    }
    let content = "Umjunsik is {}!".format(param);
    res.send(content);
});

app.get("/sum/:a/:b", (req, res) => {
    let notNum = false;
    for (let ind in req.params) {
        if (isNaN(req.params[ind]) == true) {
            notNum = true;
            break;
        }
    }
    if (notNum == false) {
        let result = Number(req.params.a) + Number(req.params.b);
        res.send("result: {}".format(result));
    } else {
        res.send("one or two parameters are not number");
    }
});

app.get("/min/:a/:b", (req, res) => {
    let notNum = false;
    for (let ind in req.params) {
        if (isNaN(req.params[ind]) == true) {
            notNum = true;
            break;
        }
    }
    if (notNum == false) {
        let result = Number(req.params.a) - Number(req.params.b);
        res.send("result: {}".format(result));
    } else {
        res.send("one or two parameters are not number");
    }
});

app.get("/mult/:a/:b", (req, res) => {
    let notNum = false;
    for (let ind in req.params) {
        if (isNaN(req.params[ind]) == true) {
            notNum = true;
            break;
        }
    }
    if (notNum == false) {
        let result = Number(req.params.a) * Number(req.params.b);
        res.send("result: {}".format(result));
    } else {
        res.send("one or two parameters are not number");
    }
});

app.get("/div/:a/:b", (req, res) => {
    let notNum = false;
    for (let ind in req.params) {
        if (isNaN(req.params[ind]) == true) {
            notNum = true;
            break;
        }
    }
    if (notNum == false) {
        if (Number(req.params.b) != 0) {
            let result = Number(req.params.a) / Number(req.params.b);
            res.send("result: {}".format(result));
        } else {
            res.send("cannot divide into 0!");
        }
    } else {
        res.send("one or two parameters are not number");
    }
});

app.get("/mult3/:a/:b/:c", (req, res) => {
    let notNum = false;
    for (let ind in req.params) {
        if (isNaN(req.params[ind]) == true) {
            notNum = true;
            break;
        }
    }
    if (notNum == false) {
        let result = Number(req.params.a) * Number(req.params.b) * Number(req.params.c);
        res.send("result: {}".format(result));
    } else {
        res.send("one or two parameters are not number");
    }
});

app.get("/mungtangee", (req, res) => {
    let notNum = false;
    if (req.query.mte != null) {
        if (isNaN(req.query.mte) == false) {
            let result = "";
            for (let ind = 1; ind <= Number(req.query.mte); ind++) {
                result += "뭉탱이로 있다가 유링게슝 아니그냥 ";
            }
            res.send(result);
        } else {
            res.send("나가!");
        }
    } else {
        res.send("나가!");
    }
});

app.get("/save", (req, res) => {
    let param = req.query.data;
    if (param != null) {
        fs.writeFile("C:\\temp\\data.txt", param, {encoding: "utf-8"}, (error, data) => {
            if (error) {
                res.send("failed to save data");
            } else {
                console.log("data has saved by user");
                res.send("data saved: {}".format(param));
            }
        });
    } else {
        res.send("data is missing!");
    }
});

app.get("/get", (req, res) => {
    fs.readFile("C:\\temp\\index.html", {encoding: "utf-8"}, (error, data) => {
        if (error) {
            res.send("sorry, there was a problem during reading file.");
        } else {
            res.send("readed data: {}".format(data));
        }
    });
});

// curl -X POST localhost:8888/add?path=post.txt -d '{\"text\": \"test post\"}'
// curl -X POST localhost:8888/add?path=post.txt -d "test post!"
app.post("/add", (req, res) => {
    let path = req.query.path;
    let body = req.body;
    if (path != null) {
        if (body.text != null) {
            fs.writeFile("C:\\temp\\{}".format(path), body, {encoding: "utf-8"}, (error, data) => {
                if (error) {
                    res.send("sorry, there was a problem during writing file.");
                } else {
                    res.send("{} has succesfully added.".format(path));
                }
            });
        } else {
            res.send("body requires text!");
            console.log(body);
        }
    } else {
        res.send("please enter the path!");
    }
});

app.post("/calc", (req, res) => { // 헤더 : application/x-www-
    let operation = req.body.operation;
    let a = req.body.a;
    let b = req.body.b;

    if (operation != null) {
        if (a != null && b != null) {
            if (isNaN(a) == false && isNaN(b) == false) {
                let result = 0;
                switch (operation) {
                    case " ": // 더하기 (+는 띄어쓰기로 처리되서 안됨, 예시로 song+name 등 띄어쓰기 처리)
                        result = Number(a) + Number(b);
                        break;
                    case "-": // 빼기
                        result = Number(a) - Number(b);
                        break;
                    case "*": // 곱하기
                        result = Number(a) * Number(b);
                        break;
                    case "/": // 나누기
                        if (Number(b) != 0) {
                            result = Number(a) / Number(b);
                        } else {
                            result = null;
                            res.send("cannot divide into 0");
                        }
                        break;
                    default:
                        result = null;
                        res.send("not supporting operation");
                        break;
                }

                if (result != null) {
                    res.send("operation: " + operation + ", result: " + result);
                }
            } else {
                res.send("a or b is not number");
            }
        } else {
            let resa = "";
            let resb = "";
            if (a == null) {
                resa = "a: null "
            }
            if (b == null) {
                resb = "b: null "
            }
            res.send("a or b is not given! " + resa + resb);
        }
    } else {
        res.send("operation not set");
    }
});

app.post("/operation", (req, res) => { // 헤더 : text/plain
    let origin = req.body;
    if (origin != null) { // 받은 문자열이 있으면?
        let result = null;
        let error = null;
        let operators = ["+", "-", "*", "/", "(", ")"];
        let split = origin.multiSplit("+", "-", "*", "/", "(", ")");
        let openerCount = 0;
        let closerCount = 0;
        console.log(split);
        for (let ind in split) { // 스플릿 된 거를 숫자로 변환
            console.log(split[ind]);
            if (isNaN(split[ind]) == false) { // 숫자라면
                split[ind] = Number(split[ind]); // 숫자로 변환
            } else if (operators.indexOf(split[ind]) != 1) { // 연산자라면
                if (split[ind] == "(") {
                    openerCount++;
                } else if (split[ind] == ")") {
                    closerCount++;
                }
            }
            else { // 숫자 아닌데 연산자도 아니라면
                error = "not supported operator";
                console.log("error: " + error + ", " + split[ind]);
                break;
            }
        }
        if (openerCount != closerCount) {
            error = "invalid braces: " + openerCount + ", " + closerCount;
        }

        if (error == null) {
            // 괄호 수가 맞는 지 검색
            const calculate = (data) => {
            
            }
        }

        if (result != null) {
            res.send("result: " + result);
        } else {
            if (error != null) {
                res.send("error: " + error);
            } else {
                res.send("error occured");
            }
        }
    } else {
        res.send("operation not set");
    }
});

app.get("/naver", (req, res) => {
    res.send("");
});

console.log(__dirname);
app.use("/operation", express.static(__dirname + "/pages/calc"));
//app.use("/operation", express.static(__dirname + "/pages/calculator/public/index.html"));
app.use("/naver", express.static(__dirname + "/pages/naver"));

let server = app.listen(8888, () => {
    console.log("Server is running now");
});