define(["app/app"], function(App) {
  "use strict";

  App.TimelineLikesRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find('timeline', params.username + '/likes')
    },

    deactivate: function() {
      this.controllerFor('pub-sub').unsubscribe()
    },

    setupController: function(controller, model) {
      this.controllerFor('pub-sub').set('channel', model)

      controller.set('model', model)
    }
  })
})
