var canvas; //Will be linked to the canvas in our index.html page
var stage; //Is the equivalent of stage in AS3; we'll add "children" to it
 
// Graphics
//[Background]
 
var bg; //The background graphic
 
//[Title View]
  
 
var main; //The Main Background
var startB; //The Start button in the main menu
var creditsB; //The credits button in the main menu
 
//[Credits]
 
 
var credits; //The Credits screen
 
//[Game View]
 
 
var player; //The player paddle graphic
var ball; //The ball graphic
var cpu; //The CPU paddle
var win; //The winning popup
var lose; //The losing popup

var tkr = new Object;

//preloader
var preloader;
var manifest;
var totalLoaded = 0;

var TitleView = new Container();

function Main()
{
    /* Link Canvas */
     
    canvas = document.getElementById('PongStage');
    stage = new Stage(canvas);
         
    stage.mouseEventsEnabled = true;
     
    manifest = [
				{src:"assets/potato.jpg", id:"potato"},
				{src:"assets/bg.jpg", id:"bg"},
				{src:"assets/fightMenu.png", id:"fightMenu"},
				{src:"assets/ennemy.png", id:"ennemySprite1"},
				{src:"assets/ennemy.png", id:"ennemySprite2"},
				{src:"assets/ennemy.png", id:"ennemySprite3"},
				{src:"assets/ennemy.png", id:"ennemySprite4"}
            ];
 
    preloader = new PreloadJS();
    //preloader.installPlugin(SoundJS);
    preloader.onProgress = handleProgress;
    preloader.onComplete = handleComplete;
    preloader.onFileLoad = handleFileLoad;
    preloader.loadManifest(manifest);
 
    /* Ticker */
     
    Ticker.setFPS(30);
    Ticker.addListener(stage);
}

function handleProgress(event)
{
    //use event.loaded to get the percentage of the loading
}
 
function handleComplete(event) {
         //triggered when all loading is complete
}
 
function handleFileLoad(event) {
    //triggered when an individual file completes loading
             
    switch(event.type)
    {
        case PreloadJS.IMAGE:
            //image loaded
            var img = new Image();
            img.src = event.src;
            img.onload = handleLoadComplete;
			window[event.id] = new Bitmap(img);
			window[event.id].id = event.id;
			
			
        break;
 
        case PreloadJS.SOUND:
        //sound loaded
        handleLoadComplete();
        break;
    }
}

function handleLoadComplete(event) 
{
   totalLoaded++;
    
   if(manifest.length==totalLoaded)
   {
       addTitleView();
   }
}

function addTitleView()
{
	/*potato.x = 50;
	potato.y = 50;
	TitleView.addChild(potato);
	stage.addChild(TitleView);
	stage.update();*/
	console.log("ding");
    var fi = new Fight([1,2,3]);
	
    
}

function showCredits()
{
    // Show Credits
         
    credits.x = 480;
         
    stage.addChild(credits);
    stage.update();
    Tween.get(credits).to({x:0}, 300);
    credits.onPress = hideCredits;
}
 
// Hide Credits
 
function hideCredits(e)
{
    Tween.get(credits).to({x:480}, 300).call(rmvCredits);
}
 
// Remove Credits
 
function rmvCredits()
{
    stage.removeChild(credits);
}
 
// Tween Title View
 
function tweenTitleView()
{       
    // Start Game
         
    Tween.get(TitleView).to({y:-320}, 300).call(addGameView);
}

function addGameView()
{
    // Destroy Menu & Credits screen
     
    stage.removeChild(TitleView);
    TitleView = null;
    credits = null;
     
    // Add Game View
     
     
    // Start Listener 
     
    bg.onPress = startGame;
}

function startGame(e)
{
    bg.onPress = null;
    stage.onMouseMove = movePlayer;
     
    Ticker.addListener(tkr, false);
    tkr.tick = update;
}

function movePlayer(e)
{
    //moving the player depending of the things done
}

function update()
{
    //what happend every ticks
}