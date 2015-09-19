define(["config",
        "app/app",
        "mixins/TransitionalRoute"], function(config, App) {
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

    afterModel: function(model) {
      this._super.apply(this, arguments)

      var title =
        'Direct messages - ' +
        config.siteName

      $(document).attr('title', title)
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
