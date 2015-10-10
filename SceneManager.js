var SceneManager = new (function(){
    var that = this;
    this.stage = null;
    this.sceneStack = [];
    this.load = function(scene){
        that.sceneStack = [scene];
        that.changeScene();
    };
    this.push = function(scene){
        that.sceneStack.push(scene);
        that.changeScene();
    };
    this.pop = function(){
        var oldScene =  that.sceneStack.pop();
        that.changeScene();
        return oldScene;
    };
    this.changeScene = function(){
        that.stage.removeAllChildren();
        var currentScene = that.sceneStack[that.sceneStack.length - 1];
        that.stage.addChild(new createjs.Bitmap(ImageManager.getImage(currentScene.bg)));
        currentScene.objects.forEach(function(object){
            var bitmap = new createjs.Bitmap(ImageManager.getImage(object.img));
            bitmap.x = object.pos.x;
            bitmap.y = object.pos.y;
            stage.addChild(bitmap);
        });
        currentScene.characters.forEach(function(character){
            stage.addChild(character);
        });
        stage.update();
    };
    this.onKeyPressed = function(event){
        that.sceneStack[that.sceneStack.length - 1].onKeyPressed(event);
    };
    this.onKeyReleased = function(event){
        that.sceneStack[that.sceneStack.length - 1].onKeyReleased(event);
    };
})();
        
