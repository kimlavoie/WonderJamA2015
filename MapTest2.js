function MapTest2(){
    var that = this;
    this.onUpdate = function(){
        that.handleWalk();
        if(InputManager.keyStates.enter) that.hideMessage();
        if(InputManager.keyStates.space) 
            SceneManager.pop();
        that.stage.update();
    };
    this.setBg("test");
    this.setObjects([
            {type: "image", collidable: false, pos: {x:0, y:0}, imgID: "test3", onCollision: function(character){}},
            {type: "image", collidable: false, pos: {x:100, y:100}, imgID: "test2"},
            {type: "text", collidable: true, onCollision: function(character){that.showMessage("Noooo!");},pos: {x:200, y:400}, text: "Hello!", font: "20px Arial", color: "#ff00ff"}
        ]);
    this.setCharacters([
            {name:"kim", pos:"left"},
            {name:"vero", pos:"top"},
            {name:"jordan", pos:"right"}
        ]);
    this.setCameraCenter({x:200, y:500});
    this.setRandomEncounterPercentage(0);
    this.setEncounterGroups([]);
}

MapTest2.prototype = new Map();
