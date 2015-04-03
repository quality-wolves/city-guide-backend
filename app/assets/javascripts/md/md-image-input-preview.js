(function($){
  var W = function (jQ,options){
    W.super( this, 'constructor', jQ, options );
    this.$img = this.$.siblings( this.options.imageSelector );
    this.reader = new FileReader();
    this.reader.onload = this.mkOnLoadImg();
  }.extends( App.getWidgetsOfAlias('MDWidget') );

  W.prototype.mkOnLoadImg = function(){
    var widget = this;
    return function(e){
      var img = $('<img>',{src:e.target.result,width:'100%'});
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

  var S = function(jQ){
    S.super( this, 'constructor', jQ);
    this.$position = this.$.find('input[name*="position"]');
  }.extends( App.getWidgetsOfAlias('MDWidget') );

  Object.defineProperty( S.prototype, 'position' , {
    get:function(){
      return parseInt(this.$position.val(),10);
    },
    set:function(p){
      this.$position.val(p)
    }
  });

  S.sort = function(container){
    container.children().map(S.setPosition);
  }

  S.setPosition = function(i){
    var s = $.data(this,'s');
    if(!s){
      s = new S($(this));
      $.data(this,'s',s);
    }
    s.position = i;
  };

  S.onAppend = function(item){
    var $item = $(item), $p = $item.prev();
    S.setPosition.call($item, !$p.length ? 0 : $p.data('s').position + 1);
  };

  App.ready(function(){
    $('.gallery').on('change','input[type="file"][role="image"]',W.onChangeFile);
    $('.gallery[type="sortable"] .row')
      .sortable({ stop:function(e,ui){ S.sort(ui.item.parent()); } })
      .each(function(){S.sort($(this));});
    $('#nested-forms-list')
      .on('cocoon:after-insert', function(e,item){ S.onAppend(item);})
      .on('cocoon:before-remove', function(e,item){ S.sort(item.parent()); } );
  });

})(App.jQuery);