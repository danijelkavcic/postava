Template.tekme.tekma = function(){
  return Tekme.findOne({_id:id});
}

Template.tekme.events({
  'click .delete': function (ev) {
    if (confirm("Delete " + $(ev.target).data('delete'))){
      Tekme.remove({_id: $(ev.target).data('delete')})          
    }
  }    
});

Template.igralectekma.events({
  'click .pride': function(ev) {
    var igralec_id = $(ev.target).data('id');
    var tekma_id = $(ev.target).data('tekmaid');
    var igralecSelector = {igralec_id: igralec_id, tekma_id:tekma_id};
    var igralec = IgralciNaTekmi.findOne(igralecSelector);
    igralec.pride = true;
    var upsert = IgralciNaTekmi.upsert({_id: igralec._id}, {$set: {pride: true}});
  },
    'click .manjka': function(ev) {
    var igralec_id = $(ev.target).data('id');
    var tekma_id = $(ev.target).data('tekmaid');
    var igralecSelector = {igralec_id: igralec_id, tekma_id:tekma_id};
    var igralec = IgralciNaTekmi.findOne(igralecSelector);
    igralec.pride = false;
    var upsert = IgralciNaTekmi.upsert({_id: igralec._id}, {$set: {pride: false}});
  }
});

Template.igralectekma.aliPride = function (pride) {
  return this.pride === pride;
};