function MapVillage2(){
    var that = this;
    var gameState = "new";
    var delay = 2;
    var dialogue1 = {
        lines: [
            "...",
            "...",
            "Kim: Le village semble désert...",
            "Véro: C'est comme si tout avait été abandonné...",
            "Jordan: Noooooon",
            "Kim: Allons voir au nord, à la vieille forteresse!",
             "Jordan: Par le chemin où la grosse roche?",
             "Kim: Oui."
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
                that.face("up");
                if(InputManager.keyStates.space) SceneManager.load(new MapTest());
                break;
        }
        that.stage.update();
    };
    this.setBg("villageP");
    this.setObjects([
            {type: "image", collidable: true, solid: true, pos: {x:1270, y:30}, imgID: "maisonP", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:470, y:670}, imgID: "maisonP", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:130, y:670}, imgID: "maisonP", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:470, y:1040}, imgID: "maisonP", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, pos: {x:130, y:1040}, imgID: "maisonP", onCollision: function(character){}},
            {type: "image", collidable: true, solid: true, onCollision: function(){that.showMessage("Vite, vers la forteresse!"); gameState = "end";}, pos: {x:1050, y:20}, imgID: "rockP1"},
            {id: "title", type: "text", pos: {x:50, y:800}, align: "center", text: "Chapitre 3\nDésolation", font: "50px Georgia", color: "#723CDE"}
        ]);
    this.setCharacters([
            {name:"kim", pos:"top"},
            {name:"vero", pos:"left"},
            {name:"jordan", pos:"right"}
        ]);
    this.setCameraCenter({x:50, y:980});
    this.setRandomEncounterPercentage(0.4);
    this.setEncounterGroups([
            {enemies:[2,2], rate:20},
            {enemies:[2,4], rate:20},
            {enemies:[2,3], rate:20},
            {enemies:[3,4], rate:40},
            ]);
}

MapVillage2.prototype = new Map();
