var VIEWPORT = {width: 640, height: 480};

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
        currentScene.stage = that.stage;
        if(currentScene.state === "new"){
            currentScene.onCreate();
        }
        /*
        currentScene.characters.forEach(function(character){
            stage.addChild(character);
        });
        */
    };
    this.onKeyPressed = function(event){
        that.sceneStack[that.sceneStack.length - 1].onKeyPressed(event);
    };
    this.onKeyReleased = function(event){
        that.sceneStack[that.sceneStack.length - 1].onKeyReleased(event);
    };
})();
        
