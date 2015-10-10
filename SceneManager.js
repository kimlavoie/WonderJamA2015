var VIEWPORT = {width: 640, height: 480};

var SceneManager = new (function(){
    var that = this;
    this.stage = null;
    this.sceneStack = [];
    this.load = function(scene){
        if(that.sceneStack.length > 0){
            that.sceneStack[that.sceneStack.length - 1].state = "paused";
        }
        that.sceneStack = [scene];
        that.changeScene();
    };
    this.push = function(scene){
        if(that.sceneStack.length > 0){
            that.sceneStack[that.sceneStack.length - 1].state = "paused";
        }
        that.sceneStack.push(scene);
        that.changeScene();
    };
    this.pop = function(){
        var oldScene =  that.sceneStack.pop();
        oldScene.state = "paused";
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
        else if(currentScene.state === "paused"){
            currentScene.onResume();
        }
        currentScene.state = "running";

        createjs.Ticker.removeAllEventListeners();

        createjs.Ticker.framerate = 20;
        createjs.Ticker.addEventListener("tick", function(event){
            currentScene.onUpdate();
        });
    };
})();
        
