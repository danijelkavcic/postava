Template.tekme.tekma = function(){
  return Tekme.findOne({_id:id});
}

Template.tekme.events({
  'click .delete': function (ev) {
    if (confirm("Delete " + $(ev.target).data('delete'))){
      Tekme.remove({_id: $(ev.target).data('delete')})          
    }
  },
  'click #naredipostavo': function(ev) {
    var beli = 0;
    var crni = 0;
    for (var i = 4; i > 0; i--)    {
      var nePridejo = IgralciNaTekmi.find({rating:i, pride:false}).fetch();
      nastaviEkipo(nePridejo, null);
      var igralci = IgralciNaTekmi.find({rating:i, pride:true}).fetch();
      var mixed = shuffle(igralci);
      var mixed1 = mixed.splice(0, Math.floor(mixed.length/2));
      if (beli < crni) {
        nastaviEkipo(mixed, ekipa.BELI);
        beli += mixed.length;
        nastaviEkipo(mixed1, ekipa.CRNI);
        crni += mixed1.length;
      }
      else{
        nastaviEkipo(mixed1, ekipa.BELI);
        beli += mixed1.length;
        nastaviEkipo(mixed, ekipa.CRNI);
        crni += mixed.length;
      }
    }
  }    
});

var ekipa = {
  BELI: 0,
  CRNI: 1,
};

Template.igralectekma.events({
  'click .pride': function(ev) {
    var id = $(ev.target).data('id');
    IgralciNaTekmi.update({_id: id}, {$set: {pride: true}});
  },
  'click .manjka': function(ev) {
    var id = $(ev.target).data('id');
    IgralciNaTekmi.update({_id: id}, {$set: {pride: false}});
  }
});

Template.igralectekma.aliPride = function (pride) {
  return this.pride === pride;
};

Template.igralectekma.jeEkipa = function (ekipa) {
  return this.ekipa === ekipa;
};

function nastaviEkipo(array, ekipa)
{
  for (var j = 0; j < array.length; j++)
  {
    var igralec = array[j];
    igralec.ekipa = ekipa;
    IgralciNaTekmi.update({_id:igralec._id}, igralec);
  }
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}