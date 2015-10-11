function Map(){
    var that = this;
    this.state = "new";
    this.stage = null;
    this.bg;
    this.objects;
    this.characters;
    this.cameraCenter;
    this.randomEncounterPercentage;
    this.encounterGroups;
    this.setBg = function(bg){that.bg = bg;};
    this.setObjects = function(objects){that.objects = objects;};
    this.setCharacters = function(characters){that.characters = characters;};
    this.setCameraCenter = function(cameraCenter){that.cameraCenter = cameraCenter;};
    this.setRandomEncounterPercentage = function(randomEncounter){
        that.randomEncounterPercentage = randomEncounter;
    };
    this.setEncounterGroups = function(encounterGroups){
        that.encounterGroups = encounterGroups;
    };
    this.setStage = function(stage){
        that.stage = stage;
    };
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
        var graphics = new createjs.Graphics().beginFill("rgba(50,50,250,0.5)")
            .drawRect(0,VIEWPORT.height-100,VIEWPORT.width,100); 
        var shape = new createjs.Shape(graphics);
        var g2 = new createjs.Graphics().setStrokeStyle(5).beginStroke("rgba(150,150,200,1)")
            .drawRect(2,VIEWPORT.height-100,VIEWPORT.width-4,100-2); 
        var shape2 = new createjs.Shape(g2);
        container.addChild(shape);
        container.addChild(shape2);
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
            var newObject;
            switch(object.type){
                case "image":
                    newObject = new createjs.Bitmap(ImageManager.getImage(object.imgID));
                    break;
                case "text":
                    newObject = new createjs.Text(object.text, object.font, object.color);
                    break;
                case "spritesheet":
                    newObject = SpriteManager[object.spriteName].clone();
                    newObject.gotoAndPlay("walkDown");
                    break;
            }
            newObject.x = object.pos.x;
            newObject.y = object.pos.y;
            if(object.collidable){
                newObject.collidable = true;
                newObject.solid = object.solid ? object.solid : false;
                newObject.onCollision = object.onCollision;
            }
            that.innerObjects.addChild(newObject);
        });
        that.characters.forEach(function(character){
            var sprite = SpriteManager[character.name];
            sprite.onCollision = function(obj){
                console.log("collision!");
            };
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
    this.onResume = function(){
        that.stage.addChild(that.innerObjects);
        that.stage.addChild(that.messageBox);
        that.stage.addChild(that.mainCharacters);
        that.characters.forEach(function(character){
            var sprite = SpriteManager[character.name];
            sprite.onCollision = function(obj){
                console.log("collision!");
            };
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
        var bounds = (new createjs.Bitmap(ImageManager.getImage(that.bg))).getBounds(); //TODO find a better way, might be slow...
        var offset = that.innerObjects.localToGlobal(0,0);
        if(InputManager.keyStates.right){
            walk("right");
            if(offset.x + bounds.width - 5 - 32> VIEWPORT.width/2)
                that.moveCamera(5,0)
        }
        else if(InputManager.keyStates.down){
            walk("down");
            if(offset.y + bounds.height - 5 - 144/3> VIEWPORT.height/2)
                that.moveCamera(0,5)
        }
        else if(InputManager.keyStates.up){
            walk("up");
            if(offset.y + 5 + 144/3 < VIEWPORT.height/2)
                that.moveCamera(0,-5)
        }
        else if(InputManager.keyStates.left){
            walk("left");
            if(offset.x + 5 + 32 < VIEWPORT.width/2)
                that.moveCamera(-5,0)
        }
        else{
            that.walking = false;
            face(that.direction);
        }
    };
    function collide(o1, o2){
        var c1 = o1.getBounds();
        var temp = o1.localToGlobal(0,0);
        c1.x = temp.x;
        c1.y = temp.y
        var c2 = o2.getBounds();
        temp = o2.localToGlobal(0,0);
        c2.x = temp.x;
        c2.y = temp.y
        return !(c1.x > c2.x + c2.width
               || c1.y > c2.y + c2.height
               || c1.x + c1.width < c2.x
               || c1.y + c1.height < c2.y);
    }
            
    this.updateCollisions = function(){
        that.mainCharacters.children.forEach(function(character){
            that.innerObjects.children.forEach(function(object){
                if(object.collidable && collide(character, object)){
                    if(object.solid){
                        switch(that.direction){
                            case "Right":
                                that.moveCamera(-5,0);
                                break;
                            case "Left":
                                that.moveCamera(5,0);
                                break;
                            case "Up":
                                that.moveCamera(0,5);
                                break;
                            case "Down":
                                that.moveCamera(0,-5);
                                break;
                        }
                    }
                    character.onCollision(object);
                    object.onCollision(character);
                }
            });
        });
    };
           
}
