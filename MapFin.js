function MapFin(){
    var that = this;
    var gameState = "new";
    var delay = 2;
    var dialogue1 = {
        lines: [
            "Jordan: Assez, j'en ai marre, on se casse!",
            "Kim et Véro: OUAIS!"
        ],
        cursor: 0
    };

    this.onUpdate = function(){
            
        switch(gameState){
            case "new":
                if(InputManager.keyStates.escape) SceneManager.load(new MapIntroduction());
                break;
        }
        that.stage.update();
    };
    this.setBg("blackbg");
    this.setObjects([
            {id: "title", type: "text", pos: {x:0, y:-100}, align: "center", text: "FIN", font: "200px Georgia", color: "#723CDE"}
        ]);
    this.setCharacters([
        ]);
    this.setCameraCenter({x:0, y:0});
    this.setRandomEncounterPercentage(0);
    this.setEncounterGroups([
            ]);
}

MapFin.prototype = new Map();
