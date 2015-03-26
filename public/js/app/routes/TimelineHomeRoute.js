define(["app/app"], function(App) {
  "use strict";

  App.TimelineHomeRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find('timeline', 'home')
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
