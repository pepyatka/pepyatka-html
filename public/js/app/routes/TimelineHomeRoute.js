define(["app/app",
        "components/TransitionalRoute",
        "components/AuthorizableRoute"], function(App) {
  "use strict";

  App.TimelineHomeRoute = Ember.Route.extend(App.TransitionalRoute,
                                             App.AuthorizableRoute, {
    queryParams: {
      offset: {
        refreshModel: true
      }
    },

    model: function(params) {
      return this.store.findOneQuery('timeline', 'home', { offset: params.offset  })
    },

    deactivate: function() {
      this.controllerFor('pub-sub').unsubscribe()
    },

    setupController: function(controller, model) {
      this.controllerFor('pub-sub').set('channel', model)

      controller.set('isSendToVisible', false)
      controller.set('model', model)
    },

    actions: {
      reloadHomepage: function() {
        this.refresh()
      }
    }
  })
})
