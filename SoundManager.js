var SoundManager = new (function() {
     var that = this;
     this.sounds = {};
     this.addSounds = function(sounds){
         sounds.forEach(function(sound){
             that.sounds[sound.id] = sound.src;
         });
     };
     this.getManifest = function(){
         var list = [];
         for(var key in that.sounds){
             list.push({id: key, src: that.sounds[key]});
         }
         return list;
     };
     this.play = function(id){
         createjs.Sound.play(id);
     };
})();

