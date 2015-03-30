define(["app/app"], function(App) {
  "use strict";

  App.PostRoute = Ember.Route.extend({
    deactivate: function() {
      this.controllerFor('pub-sub').unsubscribe()
    },

    model: function(params) {
      return this.store.find('post', params.postId)
    },

    setupController: function(controller, model) {
      this.controllerFor('pub-sub').set('channel', model)

      controller.set('model', model)
    }
  })
})
