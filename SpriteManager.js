var SpriteManager = new (function(){
    var that = this;
    function getSprite(name){
        var data = {
            images: ["assets/" + name + ".png"],
            frames: {width:64/2, height:144/3, count:6},
            animations: {
                walkDown: [0,1,"walkDown", 0.5],
                walkUp: [2,3,"walkUp", 0.5],
                walkRight: [4,5, "walkRight", 0.5],
                standDown: 0,
                standUp: 2,
                standRight: 4
            }
        };
        var spritesheet = new createjs.SpriteSheet(data);
        var sprite =  new createjs.Sprite(spritesheet);
        sprite.gotoAndPlay("standDown");
        return sprite;
    }
    this.kim = getSprite("kim"); 
    this.jordan = getSprite("jordan"); 
    this.vero = getSprite("vero");
})();
