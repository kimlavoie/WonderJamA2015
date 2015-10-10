function Map(){
    this.bg = "test";
    this.objects = [
            {pos: {x:0, y:0}, img: "test2"},
            {pos: {x:100, y:100}, img: "test2"}
        ];
    this.characters = [];
    this.cameraCenter = {x:100, y:100};
    this.randomEncounterPercentage = 0;
    this.encounterGroups = [];
}
