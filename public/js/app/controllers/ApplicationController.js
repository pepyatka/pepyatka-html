define(["app/app",
        "ember"], function(App, Ember) {
  "use strict";

  App.ApplicationController = Ember.Controller.extend({
    hasMessage: function() {
      var message = this.get('session.message')
      return message && message.length > 0
    }.property('session.message'),

    displayError: function(error) {
      this.get('session').set('message', error.responseJSON.err)
    }
  })
})
