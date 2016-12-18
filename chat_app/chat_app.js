Tasks = new Mongo.Collection("chats");
 
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    },
	incompleteCount: function () {
      return Tasks.find().count();
    }
  });
  Template.body.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
      
      // Insert a task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date(),            // current time
        owner: Meteor.userId(),           // _id of logged in user
        //username: Meteor.user().profile.name  // username of logged in user
		username: Meteor.user().username
      });
 
      // Clear form
      event.target.text.value = "";
    }
  });
   Template.task.events({
    
    "click .delete": function () {
      Tasks.remove(this._id);
    },
	
	
  });
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  window.setInterval(function() {
  var elem = document.getElementById('container');
  elem.scrollTop = elem.scrollHeight;
}, 5000);

 
}