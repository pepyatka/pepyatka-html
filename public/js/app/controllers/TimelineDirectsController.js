define(["app/app",
        "controllers/TimelineGenericController"], function(App) {
  "use strict";

  // Timeline on /filter/directs
  App.TimelineDirectsController = App.TimelineGenericController.extend({
    title: function() {
      return 'Direct messages'
    }.property()
  })
})
