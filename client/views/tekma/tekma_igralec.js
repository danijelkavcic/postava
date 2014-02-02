Template.tekmaIgralec.events({
  'click .pride': function(ev) {
    var id = $(ev.target).data('id');
    IgralciNaTekmi.update({_id: id}, {$set: {pride: true}});
  },
  'click .manjka': function(ev) {
    var id = $(ev.target).data('id');
    IgralciNaTekmi.update({_id: id}, {$set: {pride: false}});
  }
});

Template.tekmaIgralec.aliPride = function (pride) {
  return this.pride === pride;
};