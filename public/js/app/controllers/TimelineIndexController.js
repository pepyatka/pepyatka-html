define(["app/app",
        "ember",
        "controllers/TimelineGenericController"], function(App, Ember) {
  "use strict";

  // Timeline on /username
  App.TimelineIndexController = App.TimelineGenericController.extend({
    selectFeedsOnCreate: false,

    title: function() {
      return ''
    }.property()
  })
})
