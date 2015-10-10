 var ImageManager = new (function() {
     var that = this;
     this.images = {};
     this.addImages = function(images){
         images.forEach(function(image){
             that.images[image.id] = {src: image.src, img: null};
         });
     };
     this.addBitmaps = function(queue){
         for(var id in that.images){
             that.images[id].img = new createjs.Bitmap(queue.getResult(id));
         }
     };
     this.getManifest = function(){
         var list = [];
         for(var key in that.images){
             list.push({id: key, src: that.images[key].src});
         }
         return list;
     };
     this.getImage = function(id){
         return this.images[id].img;
     };
})();

