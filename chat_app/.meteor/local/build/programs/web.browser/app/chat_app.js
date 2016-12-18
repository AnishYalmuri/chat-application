(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// chat_app.js                                                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Tasks = new Mongo.Collection("chats");                                 // 1
                                                                       //
if (Meteor.isClient) {                                                 // 3
  // This code only runs on the client                                 //
  Template.body.helpers({                                              // 5
    tasks: function () {                                               // 6
      return Tasks.find({});                                           // 7
    },                                                                 //
    incompleteCount: function () {                                     // 9
      return Tasks.find().count();                                     // 10
    }                                                                  //
  });                                                                  //
  Template.body.events({                                               // 13
    "submit .new-task": function (event) {                             // 14
      // Prevent default browser form submit                           //
      event.preventDefault();                                          // 16
                                                                       //
      // Get value from form element                                   //
      var text = event.target.text.value;                              // 19
                                                                       //
      // Insert a task into the collection                             //
      Tasks.insert({                                                   // 22
        text: text,                                                    // 23
        createdAt: new Date(), // current time                         // 24
        owner: Meteor.userId(), // _id of logged in user               // 25
        //username: Meteor.user().profile.name  // username of logged in user
        username: Meteor.user().username                               // 27
      });                                                              //
                                                                       //
      // Clear form                                                    //
      event.target.text.value = "";                                    // 31
    }                                                                  //
  });                                                                  //
  Template.task.events({                                               // 34
                                                                       //
    "click .delete": function () {                                     // 36
      Tasks.remove(this._id);                                          // 37
    }                                                                  //
                                                                       //
  });                                                                  //
  Accounts.ui.config({                                                 // 42
    passwordSignupFields: "USERNAME_ONLY"                              // 43
  });                                                                  //
  window.setInterval(function () {                                     // 45
    var elem = document.getElementById('container');                   // 46
    elem.scrollTop = elem.scrollHeight;                                // 47
  }, 5000);                                                            //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
