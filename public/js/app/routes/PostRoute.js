define(["app/app",
        "ember",
        "mixins/CustomErrorRoute"], function(App, Ember) {
  "use strict";

  App.PostRoute = Ember.Route.extend(App.CustomErrorRoute, {
    deactivate: function() {
      this.get('pubsub').unsubscribe()
    },

    model: function(params) {
      return this.store.findOneQuery('post', params.postId, { maxComments: 'all' })
    },

    setupController: function(controller, model) {
      this.get('pubsub').set('channel', model)

      controller.set('model', model)
    }
  })
})
