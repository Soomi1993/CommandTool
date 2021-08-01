var fs = require("fs");
const COMMAND_FILE_PATH = "data/command.json";
var commands = fs.readFileSync(COMMAND_FILE_PATH);
var all_commands = JSON.parse(commands);

var express = require("express");
const { pseudoRandomBytes } = require("crypto");
var app = express();

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/html/main.html");
});

app.get("/run_command", function (req, res) {
    var name = req.query.name;
    var command = req.query.command;
    console.log(name + " - " + command);
    res.send("success");
})

app.get("/add_command", function (req, res) {
    var name = req.query.name;
    var command = req.query.command;
    console.log("add_command: " + name + " - " + command);
    all_commands.push({ name: name, command: command });
    res.send("success");
    fs.writeFileSync(COMMAND_FILE_PATH, JSON.stringify(all_commands))
})

app.get("/all_commands", function (req, res) {
    console.log("all_commands");
    res.send(all_commands);
})


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})