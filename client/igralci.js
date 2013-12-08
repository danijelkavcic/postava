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

var okCancelEvents = function (selector, callbacks) {
  var ok = callbacks.ok || function () {};
  var cancel = callbacks.cancel || function () {};

  var events = {};
  events['keyup '+selector+', keydown '+selector+', focusout '+selector] =
    function (evt) {
      if (evt.type === "keydown" && evt.which === 27) {
        // escape = cancel
        cancel.call(this, evt);

      } else if (evt.type === "keyup" && evt.which === 13 ||
                 evt.type === "focusout") {
        // blur/return/enter = ok/submit if non-empty
        var value = String(evt.target.value || "");
        if (value)
          ok.call(this, value, evt);
        else
          cancel.call(this, evt);
      }
    };

  return events;
};

Template.igralec.events(okCancelEvents('#nov-igralec', {
  ok: function(text, event){
    Igralci.insert({ime: text});
    event.target.value = "";
  }
}));

// Template.igralec.events({
//   'click #nov-igralec': function(event){
//   event.target.value = 'teta';
// },
// 'click #tt': function(){
//   $('#nov-igralec').text("tt");
// }
// });