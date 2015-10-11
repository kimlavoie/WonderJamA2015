function MapVillage(){
    var that = this;
    var gameState = "new";
    var delay = 2;
    var dialogue1 = {
        lines: [
            "Kim: Les maîtres semblent très nerveux aujourd'hui",
            "Jordan: En effet",
            "Véro: Vous ne savez pas?",
            "Jordan: Quoi?",
            "Kim: Est-ce que ç'a un lien avec ce que j'ai entendu à propos du roi?",
            "Véro: Oui. Il vient en visite à SVG aujourd'hui.",
            "Jordan: Oh non! La dernière fois que le roi est venu ici, j'ai mangé toute une râclée!",
            "Kim: Compte-toi chanceux, toi au moins il t'ont fait manger quelque chose...",
            "Véro: Taisez-vous! Le maître va nous entendre!",
            "Maître: Arrêtez de jacasser et allez me chercher du bois dans la forêt, bande de fainéant!",
            "Ensemle: Oui, maître!"
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
            case "end":
                that.face("down");
                if(InputManager.keyStates.space) SceneManager.load(new MapForest());
                break;
        }
        //if(InputManager.keyStates.space) that.hideMessage();
        that.stage.update();
    };
    this.setBg("villageV");
    this.setObjects([
            {type: "image", collidable: true, solid: true, pos: {x:1270, y:30}, imgID: "maisonV", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:470, y:670}, imgID: "maisonV", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:130, y:670}, imgID: "maisonV", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:470, y:1020}, imgID: "maisonV", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:130, y:1020}, imgID: "maisonV", onCollision: function(character){}},
            {type: "spritesheet", collidable: true, solid: true, onCollision: function(){that.showMessage("Hors de mon chemin, vermine!");}, pos: {x:160, y:445}, spriteName: "npc1"},
            {type: "spritesheet", collidable: true, solid: true, onCollision: function(){that.showMessage("On aurait dû tous vous exterminer!");}, pos: {x:1750, y:1100}, spriteName: "npc2"},
            {type: "spritesheet", collidable: true, solid: true, onCollision: function(){that.showMessage("Vous êtes des moins que rien!");}, pos: {x:1620, y:690}, spriteName: "npc1"},
            {type: "spritesheet", collidable: true, solid: true, onCollision: function(){that.showMessage("Du balai, chien!");}, pos: {x:1600, y:190}, spriteName: "npc2"},
            {type: "spritesheet", collidable: true, solid: true, onCollision: function(){that.showMessage("...");}, pos: {x:160, y:1350}, spriteName: "npc1"},
            {type: "spritesheet", collidable: true, solid: true, onCollision: function(){that.showMessage("Il vous en a fallu du temps! Allez hop, direction la forêt, je vous rosserez en revenant."); gameState = "end";}, pos: {x:1050, y:1350}, spriteName: "npc1"},
            {id: "title", type: "text", pos: {x:1000, y:500}, align: "center", text: "Chapitre 1\nUne vie de servitude", font: "50px Georgia", color: "#723CDE"}
        ]);
    this.setCharacters([
            {name:"kim", pos:"top"},
            {name:"vero", pos:"left"},
            {name:"jordan", pos:"right"}
        ]);
    this.setCameraCenter({x:1000, y:700});
    this.setRandomEncounterPercentage(0);
    this.setEncounterGroups([
            ]);
}

MapVillage.prototype = new Map();
