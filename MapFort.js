function MapFort(){
    var that = this;
    var gameState = "new";
    var delay = 2;
    var dialogue1 = {
        lines: [
            "Kim: La vieille forteresse... Il y a longtemps que je n'y étais pas venu...",
            "Véro: Vous souvenez vous quand on venait y jouer?",
            "Jordan: Ces souvenirs me semblent d'un autre monde... d'une autre époque...",
            "Kim: Assez discuté, essayons de trouver ce qui s'est passé."
        ],
        cursor: 0
    };
    var dialogue2 = {
        lines: [
            "Roi Gluant: Qui ose s'aventurer dans mon repère?",
            "Jordan: Qu'avez-vous fait de nos familles?",
            "Roi Gluant: HAHAHA, vous êtes donc des minables, comme les poltrons que j'ai exterminé il y a 10 ans?",
            "Roi Gluant: Les Vectoriels m'ont demandé de les réduire en poussière.",
            "Roi Gluant: Déguerpissez avant que je vous fasse subir le même sort.",
            "Kim: Pas question, vous allez tâter de ma botte spéciale!",
            "Véro: À L'ATTTAAAAAQQQUE!"
        ],
        cursor: 0
    };
    var dialogue3 = {
        lines: [
            "Jordan: Nous devons venger nos familles!",
            "Kim: Oui! Ces emmerdeurs de Vectoriels vont le payer de leur vie!",
            "Véro: Révolution!!!!"
        ],
        cursor: 0
    };

    this.onUpdate = function(){
            
        switch(gameState){
            case "new":
                that.face("up");
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
                //FIGHT
                that.getObjectById("boss").visible = false;
                gameState = "dialogue3"
                break;
            case "dialogue3":
                that.face("up");
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
                that.face("up");
                SceneManager.load(new MapFin());
                break;
        }
        that.stage.update();
    };
    this.setBg("dungeonInside");
    this.setObjects([
            {id: "boss", type: "image", collidable: true, solid: true, onCollision: function(){that.face("up");gameState = "dialogue2";}, pos: {x:1000, y:-100}, imgID: "boss2"},
            {id: "title", type: "text", pos: {x:1000, y:1200}, align: "center", text: "Chapitre 4\nRetour aux sources", font: "50px Georgia", color: "#723CDE"}
        ]);
    this.setCharacters([
            {name:"kim", pos:"top"},
            {name:"vero", pos:"left"},
            {name:"jordan", pos:"right"}
        ]);
    this.setCameraCenter({x:1000, y:1380});
    this.setRandomEncounterPercentage(0.6);
    this.setEncounterGroups([
            {enemies:[2,2], rate:20},
            {enemies:[2,4], rate:20},
            {enemies:[2,3], rate:20},
            {enemies:[3,4], rate:40},
            ]);
}

MapFort.prototype = new Map();
