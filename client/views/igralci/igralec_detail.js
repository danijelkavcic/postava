var tooltipvalues = ['se trudi', 'zadane žogo', 'nosilec igre', 'terminator'];

Template.igralecDetail.rendered = function () {
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
    Igralci.update({_id:id}, {$set: {rating: value}});
  });
};

Template.igralecDetail.events({
  'mouseleave .star': function (event, value) {
    var id = $(event.target).data("id");
    $('#starinfo'+id).addClass("hide");
  },
  'click .remove': function (event, value) {
    var id = $(event.target).data("id");
    Igralci.remove(id);
  }
});