Meteor.publish("igralci", function () {
  return Igralci.find();
});

Meteor.publish("tekme", function () {
  return Tekme.find();
});

// server: publish the set of parties the logged-in user can see.
Meteor.publish("igralcinatekmi", function (tekma_id) {
  return IgralciNaTekmi.find({tekma_id: tekma_id});
});
