
function MapForest(){
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
    var dialogue2 = {
        lines: [
            "Kim: Merde, cette grosse glue gélatineuse nous barre le passage.",
            "Véro: OH, IL EST TOUT JIGGLY JIGGLY",
            "Kim: ...",
            "Jordan: ...",
            "Véro: ...",
            "Véro: OK, on l'abat."
        ],
        cursor: 0
    };
    var dialogue3 = {
        lines: [
            "Véro: À nous la liberté!",
            "Kim: J'ai si hâte de retrouver ma famille!",
            "Jordan: N'attendons plus!"
        ],
        cursor: 0
    };

    this.onUpdate = function(){
            
        switch(gameState){
            case "new":
                setTimeout(function(){
                    var title = that.getObjectById("title");
                    title.visible = false;
                    gameState = "dialogue1";
                }, 2000);

                break;
            case "dialogue1":
                delay--;
                if(delay < 0 && InputManager.keyStates.space) {
                    dialogue1.cursor++;
                    delay = 2;
                }
                that.showMessage(dialogue1.lines[dialogue1.cursor]);
                if(dialogue1.cursor >= dialogue1.lines.length) {
                    gameState = "play";
                    that.hideMessage();
                }
                break;
            case "play":
                that.handleWalk();
                if(InputManager.keyStates.space) that.hideMessage();
                if(InputManager.keyStates.enter) 
                    SceneManager.push(new Menu());
                break;
            case "dialogue2":
                that.face("down");
                delay--;
                if(delay < 0 && InputManager.keyStates.space) {
                    dialogue2.cursor++;
                    delay = 2;
                }
                that.showMessage(dialogue2.lines[dialogue2.cursor]);
                if(dialogue2.cursor >= dialogue2.lines.length) {
                    gameState = "boss";
                    that.hideMessage();
                }
                break;
            case "boss":
                //FIGHT!
                that.getObjectById("boss").visible = false;
                gameState = "dialogue3"
                break;
            case "dialogue3":
                that.face("down");
                delay--;
                if(delay < 0 && InputManager.keyStates.space) {
                    dialogue3.cursor++;
                    delay = 2;
                }
                that.showMessage(dialogue3.lines[dialogue3.cursor]);
                if(dialogue3.cursor >= dialogue3.lines.length) {
                    gameState = "end";
                    that.hideMessage();
                }
                break;
            case "end":
                SceneManager.load(new MapVillage2());
                break;
        }
        that.stage.update();
    };
    this.setBg("forest");
    this.setObjects([
            {type: "image", collidable: true, solid: true, pos: {x:120, y:20}, imgID: "treeV1", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:400, y:500}, imgID: "treeV1", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:800, y:700}, imgID: "treeV1", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:200, y:200}, imgID: "treeV2", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:600, y:1000}, imgID: "treeV2", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:900, y:1020}, imgID: "treeV2", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:300, y:760}, imgID: "treeV3", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:600, y:1200}, imgID: "treeV3", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:0, y:1020}, imgID: "treeV3", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:700, y:200}, imgID: "treeV3", onCollision: function(character){}},

            {type: "image", collidable: true, solid: true, pos: {x:1080, y:20}, imgID: "treeP1", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:1360, y:300}, imgID: "treeP1", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:1760, y:700}, imgID: "treeP1", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:1160, y:200}, imgID: "treeP2", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:1200, y:1000}, imgID: "treeP2", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:1800, y:1020}, imgID: "treeP2", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:1200, y:760}, imgID: "treeP3", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:1500, y:1200}, imgID: "treeP3", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:1000, y:1020}, imgID: "treeP3", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:1600, y:200}, imgID: "treeP3", onCollision: function(character){}},

            {id: "boss", type: "image", collidable: true, solid: true, pos: {x:1600, y:400}, imgID: "boss1", onCollision: function(character){gameState = "dialogue2";}},


            {id: "title", type: "text", pos: {x:50, y:-100}, align: "center", text: "Chapitre 2\nLa longue marche", font: "50px Georgia", color: "#723CDE"}
        ]);
    this.setCharacters([
            {name:"kim", pos:"top"},
            {name:"vero", pos:"left"},
            {name:"jordan", pos:"right"}
        ]);
    this.setCameraCenter({x:60, y:100});
    this.setRandomEncounterPercentage(0.5);
    this.setEncounterGroups([
            {enemies:[0], rate: 80},
            {enemies:[0,1], rate: 20}
            ]);
}

MapForest.prototype = new Map();
