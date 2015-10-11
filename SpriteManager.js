var SpriteManager = new (function(){
    var that = this;
    function getSprite(name){
        var data = {
            images: ["assets/" + name + ".png"],
            frames: {width:64/2, height:144/3, count:8},
            animations: {
                walkDown: [0,1,"walkDown", 0.5],
                walkUp: [2,3,"walkUp", 0.5],
                walkRight: [4,5, "walkRight", 0.5],
                walkLeft: [6,7, "walkLeft", 0.50],
                standDown: 0,
                standUp: 2,
                standRight: 4,
                standLeft: 6
            }
        };
        var spritesheet = new createjs.SpriteSheet(data);
        var sprite =  new createjs.Sprite(spritesheet);
        sprite.gotoAndPlay("standDown");
        return sprite;
    }
    function getNPC(name){
        var data = {
            images: ["assets/" + name + ".png"],
            frames: {width:96/2, height:140/2, count:4},
            animations: {
                idleLeft: [0,1,"idleRight",0.1],
                idleRight: [2,3,"idleLeft", 0.1]
            }
        };
        var spritesheet = new createjs.SpriteSheet(data);
        var sprite =  new createjs.Sprite(spritesheet);
        sprite.gotoAndPlay("idleLeft");
        return sprite;
    }
    this.kim = getSprite("kim"); 
    this.jordan = getSprite("jordan"); 
    this.vero = getSprite("vero");
    this.npc1 = getNPC("npc1");
    this.npc2 = getNPC("npc2"); 
})();
