
function MapMenuPrincipal(){
    var that = this;
    var gameState = "new";
    this.onUpdate = function(){
            
        switch(gameState){
            case "new":
                if(InputManager.keyStates.enter) SceneManager.load(new MapIntroduction());
                break;
        }
        that.stage.update();
    };
    this.setBg("mainMenu");
    this.setObjects([
        ]);
    this.setCharacters([
        ]);
    this.setCameraCenter({x:320, y:240});
    this.setRandomEncounterPercentage(0);
    this.setEncounterGroups([
            ]);
}

MapMenuPrincipal.prototype = new Map();
