define(["config",
        "app/app",
        "mixins/TransitionalRoute"], function(config, App) {
  "use strict";

  App.TimelineDiscussionsRoute = Ember.Route.extend(App.TransitionalRoute, App.AuthorizableRoute, {
    queryParams: {
      offset: {
        refreshModel: true
      }
    },

    model: function(params) {
      return this.store.findOneQuery('timeline', 'filter/discussions', { offset: params.offset  })
    },

    afterModel: function(model) {
      this._super.apply(this, arguments)

      var title =
        'My discussions - ' +
        config.siteName

      $(document).attr('title', title)
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
