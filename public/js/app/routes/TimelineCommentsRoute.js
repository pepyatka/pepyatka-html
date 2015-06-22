define(["app/app",
        "components/CustomErrorRoute"], function(App) {
  "use strict";

  App.TimelineCommentsRoute = Ember.Route.extend(App.CustomErrorRoute, {
    queryParams: {
      offset: {
        refreshModel: true
      }
    },

    model: function(params) {
      return this.store.findOneQuery('timeline', params.username + '/comments', { offset: params.offset  })
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
