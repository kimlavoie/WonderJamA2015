function Menu(){
    var that = this;
    this.state = "new";
    this.stage;
    this.setStage = function(stage){
        that.stage = stage;
    };
    this.onCreate = function(){
        var bg = new createjs.Graphics().setStrokeStyle(10).beginStroke("green").beginFill("#3182DE").drawRect(0,0,VIEWPORT.width, VIEWPORT.height);
        var shape = new createjs.Shape(bg);

        var font = "20px Arial";
        var color = "#005555";

        var kim = SpriteManager.kim.clone();
        kim.x = 50;
        kim.y = 50;
        kim.gotoAndPlay("walkDown");
        var kimStats = new createjs.Text(
                "HP: 0\nVitesse: 0\nAttaque: 0\nDéfense: 0\nAttaque spéciale: 0\nExpérience: 0\nNiveau: 0",
                font, color);
        kimStats.x = 150;
        kimStats.y = 10;

        var sep  = new createjs.Graphics().setStrokeStyle(5).beginStroke(color).moveTo(30,160).lineTo(350, 160);
        var sepShape = new createjs.Shape(sep);

        var vero = SpriteManager.vero.clone();
        vero.x = 50;
        vero.y = 210;
        vero.gotoAndPlay("walkDown");
        var veroStats = new createjs.Text(
                "HP: 0\nVitesse: 0\nAttaque: 0\nDéfense: 0\nAttaque spéciale: 0\nExpérience: 0\nNiveau: 0",
                font, color);
        veroStats.x = 150;
        veroStats.y = 170;

        var sep2  = new createjs.Graphics().setStrokeStyle(5).beginStroke(color).moveTo(30,320).lineTo(350, 320);
        var sepShape2 = new createjs.Shape(sep2);

        var jordan = SpriteManager.jordan.clone();
        jordan.x = 50;
        jordan.y = 375;
        jordan.gotoAndPlay("walkDown");
        var jordanStats = new createjs.Text(
                "HP: 0\nVitesse: 0\nAttaque: 0\nDéfense: 0\nAttaque spéciale: 0\nExpérience: 0\nNiveau: 0",
                font, color);
        jordanStats.x = 150;
        jordanStats.y = 330;

        var box = new createjs.Graphics().setStrokeStyle(10).beginStroke("green").beginFill("#3182DE").drawRect(380,0,VIEWPORT.width-380, VIEWPORT.height);
        var boxshape = new createjs.Shape(box);

        var buttonInventoryG = new createjs.Graphics().beginFill(color).drawRect(420,30,180,50);
        var buttonInventoryS = new createjs.Shape(buttonInventoryG);
        buttonInventoryS.addEventListener("click", function(event){
            console.log("Inventaire cliqué!");
        });
        var textInventory = new createjs.Text("Inventaire", "20px Arial", "white");
        textInventory.x = 465;
        textInventory.y = 45;

        var buttonSkillsG = new createjs.Graphics().beginFill(color).drawRect(420,150,180,50);
        var buttonSkillsS = new createjs.Shape(buttonSkillsG);
        buttonSkillsS.addEventListener("click", function(event){
            console.log("Capacités cliqué!");
        });
        var textSkills = new createjs.Text("Capacités", "20px Arial", "white");
        textSkills.x = 465;
        textSkills.y = 165;

        var buttonSaveG = new createjs.Graphics().beginFill(color).drawRect(420,270,180,50);
        var buttonSaveS = new createjs.Shape(buttonSaveG);
        buttonSaveS.addEventListener("click", function(event){
            console.log("Sauvegarder cliqué!");
        });
        var textSave = new createjs.Text("Sauvegarder", "20px Arial", "white");
        textSave.x = 455;
        textSave.y = 285;

        var buttonExitG = new createjs.Graphics().beginFill(color).drawRect(420,390,180,50);
        var buttonExitS = new createjs.Shape(buttonExitG);
        buttonExitS.addEventListener("click", function(event){
            console.log("Quitter cliqué!");
        });
        var textExit = new createjs.Text("Quitter", "20px Arial", "white");
        textExit.x = 480;
        textExit.y = 405;

        that.stage.addChild(shape, kim, kimStats, vero, veroStats, jordan, jordanStats, sepShape, sepShape2, boxshape, buttonInventoryS, textInventory, buttonSkillsS, textSkills, buttonSaveS, textSave, buttonExitS, textExit);

       
        
    };
    this.onResume = function(){
    };
    this.onUpdate = function(){
        if(InputManager.keyStates.escape){
            SceneManager.pop();
        }
        that.stage.update();
    };
    this.updateCollisions = function(){};
}
