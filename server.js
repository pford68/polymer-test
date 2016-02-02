
var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    config = require("nconf"),
    app = express();

app.use(methodOverride());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use("/polymer-test", express.static(__dirname + "/src/"));

app.get("/preferences/:userId", function(req, res){
    var data = {};
    if (req.param("userId") == "pford"){
        data = {
            first: "Philip",
            last: "Ford",
            components: ['core-ajax', 'toolbar', 'ent-map'],
            dashboard: 'desktop'
        };
    }
    res.send(data);
});

exports.start = function(port){
    app.listen(port);
    console.log("Server listening on port " + port);
    console.log(config.get("message"));
};