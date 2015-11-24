define(["config",
        "app/app",
        "ember",
        "controllers/ApplicationController"], function(config, App, Ember) {
  "use strict";

  App.GroupsHomeController = App.ApplicationController.extend({
    title: function() {
      return 'Groups'
    }.property(),

    groups: function() {
      return this.get('session.currentUser.groups')
    }.property('session.currentUser.groups')
  })
})
