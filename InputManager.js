var InputManager = new (function(){
    var that = this;
    this.keyStates = {
        left: false,
        right: false,
        up: false,
        down: false,
        space: false,
        enter: false,
        escape: false
    };
    this.onKeyDown = function(event){
        switch(event.keyCode){
            case 37:
                that.keyStates.left = true;
                break;
            case 39:
                that.keyStates.right = true;
                break;
            case 38:
                that.keyStates.up = true;
                break;
            case 40:
                that.keyStates.down = true;
                break;
            case 32:
                that.keyStates.space = true;
                break;
            case 13:
                that.keyStates.enter = true;
                break;
            case 27:
                that.keyStates.escape = true;
                break;
        }
    };
   this.onKeyUp = function(event){
        switch(event.keyCode){
            case 37:
                that.keyStates.left = false;
                break;
            case 39:
                that.keyStates.right = false;
                break;
            case 38:
                that.keyStates.up = false;
                break;
            case 40:
                that.keyStates.down = false;
                break;
            case 32:
                that.keyStates.space = false;
                break;
            case 13:
                that.keyStates.enter = false;
                break;
            case 27:
                that.keyStates.escape = false;
                break;
        }
    };
})();
