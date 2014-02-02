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

Template.sidemenu.izbranaTekma = function () {
  return this._id === Session.get("tekma_id");;
};