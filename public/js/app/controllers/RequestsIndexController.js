define(["config",
        "app/app",
        "ember",
        "controllers/ApplicationController"], function(config, App, Ember) {
  "use strict";

  App.RequestsIndexController = App.ApplicationController.extend({
    title: 'Subscription requests',

    actions: {
      accept: function(user) {
        var currentUser = this.get('session.currentUser')

        currentUser.acceptRequest(user)
          .then(function() {
          }.bind(this))
      },

      reject: function(user) {
        var currentUser = this.get('session.currentUser')

        currentUser.rejectRequest(user)
          .then(function() {
          }.bind(this))
      },

    }
  })
})
