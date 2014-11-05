/**
 *
 */
Polymer('ui-panel', {
    created: function(){
        // Must initialize JSON-compatible attributes with the proper type
        // in order to de-serialize values correctly in the change observer.
        this.data = [];
    },
    ready: function () {
        console.log("ui-panel");
    },
    leftChanged: function (oldValue, newValue) {
        this.style.left = newValue + "px";
    },
    topChanged: function (oldValue, newValue) {
        this.style.top = newValue + "px";
    },
    widthChanged: function(oldValue, newValue){
        this.style.width = newValue + "px";
    },
    styleChanged: function(oldValue, newValue){
        this.style = newValue;
    },
    dataChanged: function(oldValue, newValue){
        console.log("In data changed");
        this.coordinates = newValue.map(function(item){
            return item.position;
        });
        this.fire("change", { coordinates: this.coordinates });
    }
});
