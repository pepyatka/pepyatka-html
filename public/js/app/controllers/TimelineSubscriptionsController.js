define(["app/app",
        "ember",
        "controllers/ApplicationController"], function(App, Ember) {
  "use strict";

  App.TimelineSubscriptionsController = App.ApplicationController.extend({
    title: function() {
      return ''
    }.property()
  })
})
