function MapTest(){
    var that = this;
    this.onUpdate = function(){
        that.handleWalk();
        if(InputManager.keyStates.space) that.hideMessage();
        if(InputManager.keyStates.enter) 
            SceneManager.load(new MapTest2());
        that.stage.update(event);
    };
    this.setBg("test");
    this.setObjects([
            {type: "image", collidable: false, pos: {x:0, y:0}, imgID: "test2", onCollision: function(character){}},
            {type: "image", collidable: false, pos: {x:100, y:100}, imgID: "test2"},
            {type: "text", collidable: true, onCollision: function(character){that.showMessage("YOUPPI!");},pos: {x:200, y:400}, text: "Hello!", font: "20px Arial", color: "#ff00ff"}
        ]);
    this.setCharacters([
            {name:"kim", pos:"top"},
            {name:"vero", pos:"left"},
            {name:"jordan", pos:"right"}
        ]);
    this.setCameraCenter({x:200, y:500});
    this.setRandomEncounterPercentage(0);
    this.setEncounterGroups([]);
}

MapTest.prototype = new Map();
