(function(){
  var W = function (jQ,options){
    W.super( this, 'constructor', jQ, options );
    this.$img = this.$.siblings( this.options.imageSelector );
    this.reader = new FileReader();
    this.reader.onload = this.mkOnLoadImg();
  }.extends( App.getWidgetsOfAlias('MDWidget') );

  W.prototype.mkOnLoadImg = function(){
    var widget = this;
    return function(e){
      var img = $('<img>',{src:e.target.result,width:'117px'});
      img.insertBefore(widget.$img);
      widget.$img.remove();
      widget.$img = img;
    };
  };

  Object.defineProperty( W.prototype, 'files' , {
    get:function(){
      return this.$.get(0).files;
    }
  });

  W.onChangeFile = function(){
    var $this = $(this), w = $(this).data('w');
    if(!w){
      w = new W($this);
      $.data(this,'w',w);
    }
    if (w.files && w.files[0]) w.reader.readAsDataURL(w.files[0]);
  };

  App.ready(function(){
    $('.form-body').on('change','input[type="file"][role="image"]',W.onChangeFile);
  });

})();