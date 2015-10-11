function Main(){
    var canvas = document.getElementById("PongStage");
    stage = new createjs.Stage(canvas);

    stage.mouseEventsEnabled = true;

    SceneManager.stage = stage;

    ImageManager.addImages([
            {src: "assets/mainMenu.jpg", id: "mainMenu"},
            {src: "assets/fightMenu.png", id: "fightMenu"},
            {src: "assets/bg.jpg", id: "bg"},
            {src: "assets/test3.jpg", id: "test3"},
            {src: "assets/test2.png", id: "test2"},
            {src: "assets/test.png", id: "test"},
            {src: "assets/boss1.png", id: "boss1"},
            {src: "assets/boss2.png", id: "boss2"},
            {src: "assets/bushP.png", id: "bushP"},
            {src: "assets/bushV.png", id: "bushV"},
            {src: "assets/dungeonBuilding.png", id: "dungeonBuilding"},
            {src: "assets/dungeonEnter.png", id: "dungeonEnter"},
            {src: "assets/dungeonInside.png", id: "dungeonInside"},
            {src: "assets/forest.png", id: "forest"},
            {src: "assets/maisonP.png", id: "maisonP"},
            {src: "assets/maisonV.png", id: "maisonV"},
            {src: "assets/slimeP2.png", id: "slimeP2"},
            {src: "assets/rockP1.png", id: "rockP1"},
            {src: "assets/rockP2.png", id: "rockP2"},
            {src: "assets/slimeP3.png", id: "slimeP3"},
            {src: "assets/rockV1.png", id: "rockV1"},
            {src: "assets/rockV2.png", id: "rockV2"},
            {src: "assets/slimeP1.png", id: "slimeP1"},
            {src: "assets/slimeP4.png", id: "slimeP4"},
            {src: "assets/slimeV1.png", id: "slimeV1"},
            {src: "assets/slimeV2.png", id: "slimeV2"},
            {src: "assets/slimeV3.png", id: "slimeV3"},
            {src: "assets/slimeV4.png", id: "slimeV4"},
            {src: "assets/treeP1.png", id: "treeP1"},
            {src: "assets/treeP2.png", id: "treeP2"},
            {src: "assets/treeP3.png", id: "treeP3"},
            {src: "assets/treeV1.png", id: "treeV1"},
            {src: "assets/treeV2.png", id: "treeV2"},
            {src: "assets/treeV3.png", id: "treeV3"},
            {src: "assets/villageP.png", id: "villageP"},
            {src: "assets/villageV.png", id: "villageV"},
            {src: "assets/blackbg.jpg", id: "blackbg"},
			{src: "assets/battleKim.png", id: "battleKim"},
			{src: "assets/battleVero.png", id: "battleVero"},
			{src: "assets/battleJordan.png", id: "battleJordan"}
    ]);
    SoundManager.addSounds([
            {src: "assets/testSound.mp3", id: "testSound"},
            {src: "assets/bip.mp3", id: "bip"}
    ]);
    MusicManager.addMusics([
            {src: "assets/testSound.mp3", id: "testMusic"},
            {src: "assets/dark.mp3", id: "dark"},
            {src: "assets/forest.mp3", id: "forestMusic"},
            {src: "assets/peaceful.mp3", id: "peaceful"},
            {src: "assets/adventure.mp3", id: "adventure"},
            {src: "assets/lullaby.mp3", id: "lullaby"},
            {src: "assets/boss.mp3", id: "boss"},
            {src: "assets/playground.mp3", id: "playground"},
    ]);

    this.document.onkeydown = InputManager.onKeyDown;
    this.document.onkeyup = InputManager.onKeyUp;


    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.loadManifest(SoundManager.getManifest());
    queue.loadManifest(ImageManager.getManifest());
    queue.loadManifest(MusicManager.getManifest());
    queue.on("complete", handleComplete, this);

    stage.framerate = 60;
    function handleComplete() {
        ImageManager.addBitmaps(queue);
        SceneManager.load(new MapMenuPrincipal());
    }
}

