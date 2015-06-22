define(["app/app",
        "ember"], function(App, Ember) {
  "use strict";

  App.ApplicationController = Ember.Controller.extend({
    displayError: function(error) {
      Ember.$('body').text(error.responseJSON.err)
    }
  })
})
