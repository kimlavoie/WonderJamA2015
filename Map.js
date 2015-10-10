function Map(){
    var that = this;
    this.state = "new";
    this.message = (function(){
        text = new createjs.Text("", "20px monospace");
        text.x = 10;
        text.y = VIEWPORT.height - 90;
        text.lineWidth = VIEWPORT.width - 20;
        text.lineHeight = 28;
        return text;
    })();
    this.messageBox = (function(){
        var container = new createjs.Container();
        var graphics = new createjs.Graphics().beginFill("#ff0000")
            .drawRect(0,VIEWPORT.height-100,VIEWPORT.width,100); 
        var shape = new createjs.Shape(graphics);
        container.addChild(shape);
        container.addChild(that.message);
        return container;
    })();
    this.innerObjects = new createjs.Container();
    this.onCreate = function(){
        var bg = new createjs.Bitmap(ImageManager.getImage(that.bg));
        bg.x = bg.x; 
        bg.y = bg.y;
        that.innerObjects.addChild(bg);

        that.objects.forEach(function(object){
            var bitmap = new createjs.Bitmap(ImageManager.getImage(object.imgID));
            bitmap.x = object.pos.x;
            bitmap.y = object.pos.y;
            that.innerObjects.addChild(bitmap);
        });
        that.innerObjects.x = VIEWPORT.width/2 - that.cameraCenter.x;
        that.innerObjects.y = VIEWPORT.height/2 - that.cameraCenter.y;
        that.stage.addChild(that.innerObjects);
        that.stage.addChild(that.messageBox);
        that.stage.update();
    };
    this.showMessage = function(message){
        that.message.text = message;
        that.messageBox.visible = true;
        that.stage.update();
    };
    this.hideMessage = function(){
        that.messageBox.visible = false;
        that.stage.update();
    };
    this.moveCamera = function(x,y){
        that.innerObjects.x -= x;
        that.innerObjects.y -= y;
        that.stage.update();
    };
    this.onUpdate = function(){
        if(InputManager.keyStates.left) that.moveCamera(1,0);
    };






    this.bg = "test";
    this.objects = [
            {type: "image", collidable: true, pos: {x:0, y:0}, imgID: "test2"},
            {type: "image", collidable: true, pos: {x:100, y:100}, imgID: "test2"}
        ];
    this.characters = [];
    this.cameraCenter = {x:200, y:500};
    this.randomEncounterPercentage = 0;
    this.encounterGroups = [];
}
