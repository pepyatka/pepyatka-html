define(["config",
        "app/app",
        "ember",
        "controllers/TimelineGenericController"], function(config, App, Ember) {
  "use strict";

  // Timeline on /username
  App.TimelineIndexController = App.TimelineGenericController.extend({
    selectFeedsOnCreate: false,

    isSubscribed: function() {
      return this.get('session.currentUser.subscriptions').isAny('id', this.get('model.id'))
    }.property('session.currentUser.id', 'session.currentUser.subscriptions.@each', 'model.id'),

    actions: {
      subscribe: function() {
        var user = this.get('model.user')
        Ember.$.ajax({
          url: config.host + '/v1/users/' + user.get('username') + '/subscribe',
          type: 'post',
          context: this
        })
          .then(function() {
            this.transitionToRoute('home')
          })
      },

      unsubscribe: function() {
        var user = this.get('model.user')
        Ember.$.ajax({
          url: config.host + '/v1/users/' + user.get('username') + '/unsubscribe',
          type: 'post',
          context: this
        })
          .then(function() {
            this.transitionToRoute('home')
          })
      }
    }
  })
})
