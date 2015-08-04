define(["config",
        "app/app",
        "ember",
        "controllers/ApplicationController"], function(config, App, Ember) {
  "use strict";

  App.TimelineSubscribersController = App.ApplicationController.extend({
    isEdit: false,

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
