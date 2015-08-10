define(["app/app",
        "mixins/TransitionalRoute"], function(App) {
  "use strict";

  App.TimelineDirectsRoute = Ember.Route.extend(App.TransitionalRoute, App.AuthorizableRoute, {
    queryParams: {
      offset: {
        refreshModel: true
      }
    },

    model: function(params) {
      return this.store.findOneQuery('timeline', 'filter/directs', { offset: params.offset  })
    },

    deactivate: function() {
      this.get('pubsub').unsubscribe()
    },

    setupController: function(controller, model) {
      this.get('pubsub').set('channel', model)

      controller.set('isSendToVisible', false)
      controller.set('model', model)
    }
  })
})
