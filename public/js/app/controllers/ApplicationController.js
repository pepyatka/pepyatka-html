define(["app/app",
        "ember"], function(App, Ember) {
  "use strict";

  App.ApplicationController = Ember.Controller.extend({
    hasMessage: function() {
      var message = this.get('session.message')
      return message && message.length > 0
    }.property('session.message'),

    displayMessage: function(message) {
      var that = this
      window.setTimeout(function () {
        $(".box-message").slideUp(300, function () {
          $(this).remove()
          that.get('session').set('message', null)
        })
      }, 5000)
      this.get('session').set('message', message)
    },

    displayError: function(error) {
      var msg = typeof error.responseJSON === 'undefined' ?
          error : error.responseJSON.err
      this.displayMessage(msg)
    }
  })
})
