function MapTest(){
    var that = this;
    this.onUpdate = function(){
        that.handleWalk();
        if(InputManager.keyStates.space) that.hideMessage();
        if(InputManager.keyStates.enter) 
            SceneManager.push(new Menu());
        that.stage.update();
    };
    this.setBg("test");
    this.setObjects([
            {type: "image", collidable: false, pos: {x:0, y:0}, imgID: "test2", onCollision: function(character){}},
            {type: "image", collidable: false, pos: {x:100, y:100}, imgID: "test2"},
            {type: "spritesheet", collidable: true, solid: true, onCollision: function(){that.showMessage("Salut!");}, pos: {x:200, y:100}, spriteName: "kim"},
            {type: "text", collidable: true,onCollision: function(character){that.showMessage("YOUPPI!");},pos: {x:200, y:400}, text: "Hello!", font: "20px Arial", color: "#ff00ff"}
        ]);
    this.setCharacters([
            {name:"kim", pos:"top"},
            {name:"vero", pos:"left"},
            {name:"jordan", pos:"right"}
        ]);
    this.setCameraCenter({x:200, y:500});
    this.setRandomEncounterPercentage(0.55);
    this.setEncounterGroups([
            {enemies:["slime", "slime"], rate:20},
            {enemies:["slime"], rate:80} 
            ]);
}

MapTest.prototype = new Map();
