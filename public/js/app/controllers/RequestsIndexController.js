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
            this.displayMessage('Subscription request has been approved.')
          }.bind(this))
      },

      reject: function(user) {
        var currentUser = this.get('session.currentUser')

        currentUser.rejectRequest(user)
          .then(function() {
            this.displayMessage('Subscription request has been rejected.')
          }.bind(this))
      },

    }
  })
})
