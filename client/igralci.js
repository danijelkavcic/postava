var tooltipvalues = ['se trudi', 'zadane žogo', 'nosilec igre', 'terminator'];

Template.igralci.igralci = function () {
  return Igralci.find({}, {sort: { ime: 1 }});
};

Template.igralci.rendered = function () {
  $(".star").rateit({min:0, max:4, step:1, resetable:false});

  $(".star").bind('over', function (event, value) { 
    $(this).attr('title', tooltipvalues[value-1]); 
    var id = $(event.target).data("id");
    $('#starinfo'+id).removeClass("hide");
    $('#starinfo'+id).text(tooltipvalues[value-1]);
  });

  $(".star").bind('rated', function (event, value) {
    console.log(this.id);
    var id = $(event.target).data("id");
    // var igralec = Igralci.findOne({_id:id});
    // if (igralec != null && typeof(igralec) != "undefined") {
    //   igralec.rating = value;
    Igralci.update({_id:id}, {$set: {rating: value}});
    // }
  });
};

Template.igralci.events({
  'mouseleave .star': function (event, value) {
   var id = $(event.target).data("id");
   $('#starinfo'+id).addClass("hide");
 }
});

Template.igralci.izbran_igralec = function () {
  return Igralci.findOne(Session.get("izbran_igralec"));
};


Template.igralec.events(okCancelEvents('#nov-igralec', {
  ok: function(text, event){
    Igralci.insert({ime: text});
    event.target.value = "";
  }
}));
