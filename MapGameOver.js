function MapGameOver(){
    var that = this;
    var gameState = "new";
    var delay = 2;

    this.onUpdate = function(){
            
        switch(gameState){
            case "new":
                if(InputManager.keyStates.escape) SceneManager.load(new MapMenuPrincipal());
                break;
        }
        that.stage.update();
    };
    this.setBg("blackbg");
    this.setObjects([
            {id: "title", type: "text", pos: {x:0, y:-100}, align: "center", text: "Vous êtes MORT!", font: "200px Georgia", color: "#723CDE"}
        ]);
    this.setCharacters([
        ]);
    this.setCameraCenter({x:0, y:0});
    this.setRandomEncounterPercentage(0);
    this.setEncounterGroups([
            ]);
}

MapGameOver.prototype = new Map();
