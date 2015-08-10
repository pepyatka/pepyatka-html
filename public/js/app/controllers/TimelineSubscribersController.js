define(["config",
        "app/app",
        "ember",
        "controllers/ApplicationController"], function(config, App, Ember) {
  "use strict";

  App.TimelineSubscribersController = App.ApplicationController.extend({
    isEdit: false,

    isOwner: function() {
      var currentUser = this.get('session.currentUser')
      if (!currentUser) { return false }

      var administrators = currentUser.get('administrators').toArray()
      var username = this.get('content.query')
      return (administrators.isAny('username', username)) ||
        currentUser.get('username') === username
    }.property('session.currentUser'),

    actions: {
      removeSubscriber: function(user) {
        Ember.$.ajax({
          url: config.host + '/v1/users/' + user.get('username') + '/unsubscribeFromMe',
          type: 'post',
          context: this
        })
          .then(function(response) {
            this.get('model').removeObject(user)
          })
      },

      manage: function() {
        this.set('isEdit', true)
      },

      browse: function() {
        this.set('isEdit', false)
      }
    }
  })
})
