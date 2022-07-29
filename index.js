const fs = require("fs");
const express = require("express");
const { resolveSoa } = require("dns");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

String.prototype.format = function() {
    var result = this;
    for (let ind in arguments) {
        result = result.replace("{}", arguments[ind]);
    }
    return result;
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

let server = app.listen(8888, () => {
    console.log("Server is running now");
});