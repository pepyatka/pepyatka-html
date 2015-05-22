define(["app/app",
        "ember"], function(App, Emberx) {
  "use strict";

  App.PostRoute = Ember.Route.extend({
    deactivate: function() {
      this.controllerFor('pub-sub').unsubscribe()
    },

    model: function(params) {
      return this.store.findOneQuery('post', params.postId, { maxComments: 'all' })
    },

    actions: {
      error: function (error) {
        this.transitionTo('not-found')
      }
    },

    setupController: function(controller, model) {
      this.controllerFor('pub-sub').set('channel', model)

      controller.set('model', model)
    }
  })
})
