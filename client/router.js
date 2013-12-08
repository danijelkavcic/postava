Router.map(function() { 
  this.route('home', {path: '/'})
  this.route('igralci', {path: '/igralci'});
  this.route('tekme', {
    path:'/tekme/:_id',
    data: function() {
      var tekma = Tekme.findOne({ _id: this.params._id});
      if (!tekma)
        return null;

      Session.set("tekma_id", tekma._id);
      var igralci = IgralciNaTekmi.find().fetch();
      var beli = IgralciNaTekmi.find({ekipa:ekipa.BELI}).fetch();
      var crni = IgralciNaTekmi.find({ekipa:ekipa.CRNI}).fetch();
      var tekma = {
        id: tekma._id,
        datum: tekma.datum,
        igralci: igralci,
        beli:beli,
        crni:crni
      };
      return tekma;
    }
  });
  this.route('igralec', {path:'/igralec'});
  this.route('novatekma', {path:'/novatekma'})
});
