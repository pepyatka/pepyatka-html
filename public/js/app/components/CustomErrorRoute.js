define(["app/app",
        "ember",
        "components/TransitionalRoute"], function(App, Ember) {
  "use strict";

  App.CustomErrorRoute = Ember.Mixin.create(App.TransitionalRoute, {
    actions: {
      error: function(error) {
        this.controllerFor('application').displayError(error)

        this.removeThrobber()
      }
    }
  })
})
