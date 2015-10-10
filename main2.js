var stage;

function Main(){
    var canvas = document.getElementById("PongStage");
    stage = new createjs.Stage(canvas);

    stage.mouseEventsEnabled = true;

    ImageManager.addImages([
            {src: "assets/test2.png", id: "test2"},
            {src: "assets/test.png", id: "test"}
    ]);
    SoundManager.addSounds([
            {src: "assets/testSound.mp3", id: "testSound"}
    ]);
    MusicManager.addMusics([
            {src: "assets/testSound.mp3", id: "testMusic"}
    ]);


    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.loadManifest(SoundManager.getManifest());
    queue.loadManifest(ImageManager.getManifest());
    queue.loadManifest(MusicManager.getManifest());
    queue.on("complete", handleComplete, this);
    function handleComplete() {
        ImageManager.addBitmaps(queue);
        //SoundManager.play("testSound");
        MusicManager.play("testMusic", false);

        stage.addChild(ImageManager.getImage("test2"));
        stage.update();
    }
}

