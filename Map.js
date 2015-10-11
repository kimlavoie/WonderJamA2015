function Map(){
    this.bg = "bg";
    this.objects = [
            {pos: {x:0, y:0}, img: "potato"},
            {pos: {x:100, y:100}, img: "potato"}
        ];
    this.characters = [];
    this.cameraCenter = {x:100, y:100};
    this.randomEncounterPercentage = 0;
    this.encounterGroups = [];
}