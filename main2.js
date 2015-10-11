function Main(){
    var canvas = document.getElementById("PongStage");
    stage = new createjs.Stage(canvas);

    stage.mouseEventsEnabled = true;

    SceneManager.stage = stage;

    ImageManager.addImages([
            //{src: "assets/test2.png", id: "test2"},
            //{src: "assets/test.png", id: "test"},
			{src: "assets/potato.jpg", id:"potato"},
			{src: "assets/bg.jpg", id:"bg"},
			{src: "assets/fightMenu.jpg", id:"fightMenu"},
			{src: "assets/ennemy.png", id:"ennemySprite"},
			{src: "assets/player.png", id:"playerSprite"}
    ]);
    SoundManager.addSounds([
            {src: "assets/testSound.mp3", id: "testSound"}
    ]);
    MusicManager.addMusics([
            {src: "assets/testSound.mp3", id: "testMusic"}
    ]);

    this.document.onkeydown = SceneManager.onKeyPressed;
    this.document.onkeyup = SceneManager.onKeyReleased;


    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.loadManifest(SoundManager.getManifest());
    queue.loadManifest(ImageManager.getManifest());
    queue.loadManifest(MusicManager.getManifest());
    queue.on("complete", handleComplete, this);
    function handleComplete() {
        ImageManager.addBitmaps(queue);
		//SceneManager.load(new Map());
		
		var heroesArray = [];
		heroesArray.push(new Hero("Jordan", "playerSprite", 1, 30, 30, 10, 10, 10, 5, 5, 6, 'alive'));
		heroesArray.push(new Hero("Veronique", "playerSprite", 1, 25, 25, 15, 15, 7, 8, 4, 7, 'alive'));
		heroesArray.push(new Hero("Kim", "playerSprite", 1, 35, 35, 11, 11, 8, 5, 4, 8, 'alive'));
		
		var inv = new Inventory(5,5);
		
		var fi = new Fight([0,1,2,3], stage, heroesArray, inv);
    }
	
	function handleTick(event) {
		// Actions carried out each tick (aka frame)
		if (!event.paused) {
			// Actions carried out when the Ticker is not paused.
		}
	}
}