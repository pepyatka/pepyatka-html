define(["app/app",
        "controllers/TimelineGenericController"], function(App) {
  "use strict";

  // Timeline on /filter/discussions
  App.TimelineDiscussionsController = App.TimelineGenericController.extend({
    title: function() {
      return 'My discussions'
    }.property()
  })
})
