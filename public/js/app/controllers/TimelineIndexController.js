define(["app/app",
        "ember",
        "controllers/TimelineGenericController"], function(App, Ember) {
  "use strict";

  // Timeline on /username
  App.TimelineIndexController = App.TimelineGenericController.extend({
    selectFeedsOnCreate: false,

    isSubscribed: function() {
      var currentUser = this.get('session.currentUser')
      if (!currentUser) { return false }

      return currentUser.get('subscriptions').isAny('id', this.get('model.id'))
    }.property('session.currentUser.id', 'session.currentUser.subscriptions.@each', 'model.id')
  })
})
