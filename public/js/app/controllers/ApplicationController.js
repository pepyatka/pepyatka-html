define(["app/app",
        "ember"], function(App, Ember) {
  "use strict";

  App.ApplicationController = Ember.Controller.extend({
    hasMessage: function() {
      var message = this.get('session.message')
      return message && message.length > 0
    }.property('session.message'),

    displayError: function(error) {
      window.setTimeout(function () {
        $(".box-message").slideUp(300, function () {
          $(this).remove()
        })
      }, 5000)
      this.get('session').set('message', error.responseJSON.err)
    }
  })
})
