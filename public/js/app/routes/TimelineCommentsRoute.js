define(["app/app",
        "components/TransitionalRoute"], function(App) {
  "use strict";

  App.TimelineCommentsRoute = Ember.Route.extend(App.TransitionalRoute, {
    queryParams: {
      offset: {
        refreshModel: true
      }
    },

    // actions: {
    //   error: function (error) {
    //     this.transitionTo('not-found')
    //   }
    // },

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
