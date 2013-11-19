Meteor.subscribe("igralci");

Meteor.subscribe("tekme");

Deps.autorun(function () {
	Meteor.subscribe("igralcinatekmi", Session.get("tekma_id"));
});