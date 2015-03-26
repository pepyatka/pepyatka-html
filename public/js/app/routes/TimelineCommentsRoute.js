define(["app/app"], function(App) {
  "use strict";

  App.TimelineCommentsRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find('timeline', params.username + '/comments')
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
