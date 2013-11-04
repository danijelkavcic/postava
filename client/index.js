var tooltipvalues = ['se trudi', 'zadane žogo', 'nosilec igre', 'terminator'];

Router.map(function() { 
  this.route('home', {path: '/'})
  this.route('igralci', {path: '/igralci'});
  this.route('tekme', {
    path:'/tekme/:_id',
    data: function() {
      var tekma = Tekme.findOne({ _id: this.params._id});
      if (!tekma)
        return null;
      
      var datum = tekma.datum;
      var igralci = IgralciNaTekmi.find({tekma_id: this.params._id}).fetch();
      var tekma = {
        datum: datum,
        igralci: igralci
      };
      return tekma;
    }
  });
  this.route('igralec', {path:'/igralec'});
  this.route('novatekma', {path:'/novatekma'})
});

var DateFormats = {
 short: "DD.MM.YYYY",
 long: "dddd DD.MM.YYYY HH:mm"
};

Handlebars.registerHelper("formatDate", function(datetime, format) {
  if (moment) {
    f = DateFormats[format];
    return moment(datetime).format(f);
  }
  else {
    return datetime;
  }
});

Template.sidemenu.events({
  'click #novatekma': function () {
    var datum = moment({hour: 0, minute: 0, seconds: 0, milliseconds: 0}).day(7).toDate();
    var tekma = Tekme.findOne({datum: datum});
    if (tekma == null || tekma == "undefined") {
      tekma_id = Tekme.insert({datum: datum});
      var igralci = Igralci.find({}, {sort: { ime: 1 }}).forEach(function (igralec) {
        IgralciNaTekmi.insert({tekma_id: tekma_id, igralec_id:igralec._id, ime: igralec.ime, rating: igralec.rating});
      });
      // tekma = Tekme.insert({datum: datum, igralci: igralci.fetch()});
    }
    Router.go('tekme', {_id: tekma_id});
  },

  'click .remove': function (event, value) {
    var id = $(event.target).data("id");
    Tekme.remove(id);
    Router.go('home');
  }
});

Template.sidemenu.tekme = function () {
  return Tekme.find({}, {sort: {datum: 1}});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}

/*
Template.novatekma.events({
  'submit': function () {
    form = {};
    $.each($('#novaTekmaForm').serializeArray(), function() {
      form[this.name] = this.value;
    });
    Tekme.insert(form, function(err) {
      if(!err) {
        alert("Submitted!");
        $('#novaTekmaForm')[0].reset();
      }
      else
      {
        alert("Something is wrong");
        console.log(err);
      }
    });

    event.preventDefault();
  }
});

Template.novatekma.rendered = function () {
  $('#datum').datepicker();
};

function submitForm(formid) {
  form={};

  $.each($('#' + formid).serializeArray(), function() {
    form[this.name] = this.value;
  });

    //do validation on form={firstname:'first name', lastname: 'last name', email: 'email@email.com'}

    MyCollection.insert(form, function(err) {
      if(!err) {
        alert("Submitted!");
        $('#myform')[0].reset();
      }
      else
      {
        alert("Something is wrong");
        console.log(err);
      }
    });

}
*/
