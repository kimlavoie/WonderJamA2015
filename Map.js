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
        container.visible = false;
        return container;
    })();
    this.innerObjects = new createjs.Container();
    this.mainCharacters = new createjs.Container();
    this.onCreate = function(){
        var bg = new createjs.Bitmap(ImageManager.getImage(that.bg));
        bg.x = bg.x; 
        bg.y = bg.y;
        that.innerObjects.addChild(bg);

        that.objects.forEach(function(object){
            switch(object.type){
                case "image":
                    var bitmap = new createjs.Bitmap(ImageManager.getImage(object.imgID));
                    bitmap.x = object.pos.x;
                    bitmap.y = object.pos.y;
                    that.innerObjects.addChild(bitmap);
                    break;
                case "text":
                    var text = new createjs.Text(object.text, object.font, object.color);
                    text.x = object.pos.x;
                    text.y = object.pos.y;
                    that.innerObjects.addChild(text);
                    break;
            }
        });
        that.characters.forEach(function(character){
            var sprite = SpriteManager[character.name];
            var pos;
            switch(character.pos){
                case "top":
                    pos = {x:VIEWPORT.width/2-16, y:VIEWPORT.height/2-144/3};
                    break;
                case "left":
                    pos = {x:VIEWPORT.width/2-32, y:VIEWPORT.height/2};
                    break;
                case "right":
                    pos = {x:VIEWPORT.width/2, y:VIEWPORT.height/2};
                   break;
            }
            sprite.x = pos.x;
            sprite.y = pos.y;

            that.mainCharacters.addChild(sprite);
        });
        that.innerObjects.x = VIEWPORT.width/2 - that.cameraCenter.x;
        that.innerObjects.y = VIEWPORT.height/2 - that.cameraCenter.y;
        that.stage.addChild(that.innerObjects);
        that.stage.addChild(that.messageBox);
        that.stage.addChild(that.mainCharacters);
    };
    this.showMessage = function(message){
        that.message.text = message;
        that.messageBox.visible = true;
    };
    this.hideMessage = function(){
        that.messageBox.visible = false;
    };
    this.moveCamera = function(x,y){
        that.innerObjects.x -= x;
        that.innerObjects.y -= y;
    };
    function walk(direction){
        direction = direction.charAt(0).toUpperCase() + direction.slice(1);
        if(!that.walking || direction !== that.direction){
            SpriteManager.kim.gotoAndPlay("walk" + direction);
            SpriteManager.vero.gotoAndPlay("walk" + direction);
            SpriteManager.jordan.gotoAndPlay("walk" + direction);
            that.walking = true;
            that.direction = direction;
         }
    }
    function face(direction){
        direction = direction.charAt(0).toUpperCase() + direction.slice(1);
        SpriteManager.kim.gotoAndPlay("stand" + direction);
        SpriteManager.vero.gotoAndPlay("stand" + direction);
        SpriteManager.jordan.gotoAndPlay("stand" + direction);
    }

    this.walking = false;
    this.direction = "down";
    this.handleWalk = function(){
        if(InputManager.keyStates.right){
            walk("right");
            that.moveCamera(5,0)
        }
        else if(InputManager.keyStates.down){
            walk("down");
            that.moveCamera(0,5)
        }
        else if(InputManager.keyStates.up){
            walk("up");
            that.moveCamera(0,-5)
        }
        else if(InputManager.keyStates.left){
            walk("left");
            that.moveCamera(-5,0)
        }
        else{
            that.walking = false;
            face(that.direction);
        }
    };
    this.onUpdate = function(){
        that.handleWalk();

        that.stage.update(event);

    };
    this.bg = "test";
    this.objects = [
            {type: "image", collidable: true, pos: {x:0, y:0}, imgID: "test2"},
            {type: "image", collidable: true, pos: {x:100, y:100}, imgID: "test2"},
            {type: "text", pos: {x:200, y:400}, text: "Hello!", font: "20px Arial", color: "#ff00ff"}
        ];
    this.characters = [
            {name:"kim", pos:"top"},
            {name:"vero", pos:"left"},
            {name:"jordan", pos:"right"}
        ];
    this.cameraCenter = {x:0, y:0};
    this.randomEncounterPercentage = 0;
    this.encounterGroups = [];
}
