function MapIntroduction(){
    var that = this;
    var messages = [
        "Au début, il n'y avait que les pixels.",
        "Puis, un jour, apparu les vectoriels.",
        "Au début, les deux tribus cohabitèrent ensemble, chacun ayant son rôle à jouer dans le monde du Jeu Vidéo.",
        "Les vectoriels commencèrent néanmoins à gagner en force et devinrent bientôt la race dominante.",
        "Un jour que les pixels vaquaient à leurs occupations, les vectoriels prirent d'assaut les pixels et les forcèrent à se soumettre.",
        "Depuis ce temps, les pixels sont traités en esclaves par les peuples vectoriels.",
        "Leur espoir de redevenir libre s'amenuise, jour après jour..."
        ];
    var curMes = 0;
    var delay = 2;
    this.onUpdate = function(){
        delay--;
        if(delay < 0 && InputManager.keyStates.space){
            curMes++;
            delay = 2;
        }
        if(curMes >= messages.length) SceneManager.load(new MapVillage());
        that.showMessage(messages[curMes]);
        that.stage.update();
    };
    this.setBg("blackbg");
    this.setObjects([
        ]);
    this.setCharacters([
        ]);
    this.setCameraCenter({x:640/2, y:480/2});
    this.setRandomEncounterPercentage(0);
    this.setEncounterGroups([
            ]);
}

MapIntroduction.prototype = new Map();
