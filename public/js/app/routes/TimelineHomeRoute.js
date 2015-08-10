define(["app/app",
        "mixins/TransitionalRoute",
        "mixins/AuthorizableRoute"], function(App) {
  "use strict";

  App.TimelineHomeRoute = Ember.Route.extend(App.TransitionalRoute, App.AuthorizableRoute, {
    queryParams: {
      offset: {
        refreshModel: true
      }
    },

    model: function(params) {
      return this.store.queryRecord('timeline', 'home', { offset: params.offset  })
    },

    deactivate: function() {
      this.get('pubsub').unsubscribe()
    },

    setupController: function(controller, model) {
      this.get('pubsub').set('channel', model)

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
