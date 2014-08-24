
var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    app = express();

app.use(methodOverride());
app.use(bodyParser());
app.use("/polymer-test", express.static(__dirname + "/dist/"));

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
};