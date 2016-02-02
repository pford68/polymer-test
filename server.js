
var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    app = express();

app.use(methodOverride());
app.use(bodyParser.json());
app.use("/polymer-test", express.static("./build"));

exports.start = function(port){
    app.listen(port, function(){
        console.log("Server listening on port " + port);
    });
};
