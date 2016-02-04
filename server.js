
var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    app = express();

app.use(methodOverride());
app.use(bodyParser.json());
app.use("/polymer-test", express.static("./build"));

app.get("/preferences/:userId", function(req, res){
    var data = {};
    if (req.params.userId == "pford"){
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
    app.listen(port, function(){
        console.log("Server listening on port " + port);
    });
};
