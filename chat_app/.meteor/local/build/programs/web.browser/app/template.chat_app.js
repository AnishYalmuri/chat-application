(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.DIV({
    "class": "container",
    id: "container"
  }, "\n    ", HTML.HEADER("\n	  \n	  ", Spacebars.include(view.lookupTemplate("loginButtons")), "\n	 \n	  ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n	  ", HTML.H1("Chat (", Blaze.View("lookup:incompleteCount", function() {
      return Spacebars.mustache(view.lookup("incompleteCount"));
    }), ")"), "\n	  \n	  \n	  " ];
  }), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n    ", HTML.UL("\n      ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("tasks"));
    }, function() {
      return [ "\n        ", Spacebars.include(view.lookupTemplate("task")), "\n      " ];
    }), "\n    "), "\n	", HTML.FORM({
      "class": "new-task"
    }, "\n        ", HTML.INPUT({
      type: "text",
      name: "text",
      placeholder: "Type here"
    }), "\n      "), "\n	" ];
  }), "\n  ");
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("task");
Template["task"] = new Template("Template.task", (function() {
  var view = this;
  return HTML.LI({
    "class": function() {
      return Blaze.If(function() {
        return Spacebars.call(view.lookup("checked"));
      }, function() {
        return "checked";
      });
    }
  }, HTML.Raw('\n    <button class="delete">&times;</button>\n     '), HTML.SPAN({
    "class": "text"
  }, HTML.STRONG(Blaze.View("lookup:username", function() {
    return Spacebars.mustache(view.lookup("username"));
  })), " - ", Blaze.View("lookup:text", function() {
    return Spacebars.mustache(view.lookup("text"));
  })), "\n  ");
}));

}).call(this);
