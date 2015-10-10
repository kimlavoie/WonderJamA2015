function Main(){
    var canvas = document.getElementById("PongStage");
    stage = new createjs.Stage(canvas);

    stage.mouseEventsEnabled = true;

    SceneManager.stage = stage;

    ImageManager.addImages([
            {src: "assets/test2.png", id: "test2"},
            {src: "assets/test.png", id: "test"},
			{src: "assets/potato.jpg", id:"potato"},
			{src: "assets/bg.jpg", id:"bg"},
			{src: "assets/fightMenu.png", id:"fightMenu"},
			{src: "assets/ennemy.png", id:"ennemySprite"},
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
		var fi = new Fight([1,2,3]);
    }
}

