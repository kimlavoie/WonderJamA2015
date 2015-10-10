var MusicManager = new (function() {
     var that = this;
     this.currentMusic = null;
     this.musics = {};
     this.addMusics = function(musics){
         musics.forEach(function(music){
             that.musics[music.id] = music.src;
         });
     };
     this.getManifest = function(){
         var list = [];
         for(var key in that.musics){
             list.push({id: key, src: that.musics[key]});
         }
         return list;
     };
     this.play = function(id, loop){
         if(id === undefined){
             that.currentMusic.paused = false;
             return;
         }
         if(loop === undefined){
             loop = true;
         }
         if(that.currentMusic !== null){
             that.stop();
         }
         that.currentMusic = createjs.Sound.play(id);
         that.currentMusic.loop = loop ? -1 : 0;
     };
     this.stop = function(){
         that.currentMusic.stop();
     };
     this.pause = function(){
         that.currentMusic.paused = true;
     };

})();

