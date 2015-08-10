define(["app/app",
        "mixins/CustomErrorRoute"], function(App) {
  "use strict";

  App.TimelineIndexRoute = Ember.Route.extend(App.CustomErrorRoute, {
    queryParams: {
      offset: {
        refreshModel: true
      }
    },

    model: function(params) {
      return this.store.findOneQuery('timeline', params.username, { offset: params.offset  })
    },

    deactivate: function() {
      this.get('pubsub').unsubscribe()
    },

    setupController: function(controller, model) {
      this.get('pubsub').set('channel', model)

      controller.set('model', model)
    }
  })
})
