var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.get('/formBuilder2.htm', function (req, res) {
        res.sendFile(__dirname + "/" + "formBuilder2.htm");
    })
    /*app.get('/node_modules/angular/angular.min.js', function (req, res) {
        res.sendFile(__dirname + "/" + "node_modules/angular/angular.min.js");
    })
    app.get('/node_modules/bootstrap/dist/js/bootstrap.min.js', function (req, res) {
        res.sendFile(__dirname + "/" + "node_modules/bootstrap/dist/js/bootstrap.min.js");
    })*/
app.get('/form.js', function (req, res) {
    res.sendFile(__dirname + "/" + "form.js");
})
app.use('/node_modules', express.static('node_modules'));

app.post('/generateForm', function (req, res) {
    var fd = fs.openSync("./form1.htm", 'w');
    console.log("File generated!! :D");
    console.log(res.body.data);
    res.end("File written Successfully!");
    //var buffer = req.data[0];
    //fs.write(fd, buffer, function (err, written, string) {
    //console.log("written: " + written);
    //});
});
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("form builder app listening at http://%s:%s", host, port);
})