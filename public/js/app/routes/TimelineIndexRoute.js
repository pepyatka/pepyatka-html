define(["app/app",
        "components/TransitionalRoute"], function(App) {
  "use strict";

  App.TimelineIndexRoute = Ember.Route.extend(App.TransitionalRoute, {
    queryParams: {
      offset: {
        refreshModel: true
      }
    },

    model: function(params) {
      return this.store.findOneQuery('timeline', params.username, { offset: params.offset  })
    },

    actions: {
      error: function (error) {
        this.transitionTo('not-found')
      }
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
