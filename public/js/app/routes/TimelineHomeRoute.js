define(["config",
        "app/app",
        "mixins/TransitionalRoute",
        "mixins/AuthorizableRoute"], function(config, App) {
  "use strict";

  App.TimelineHomeRoute = Ember.Route.extend(App.TransitionalRoute, App.AuthorizableRoute, {
    queryParams: {
      offset: {
        refreshModel: true
      }
    },

    model: function(params) {
      return this.store.findOneQuery('timeline', 'home', { offset: params.offset  })
    },

    afterModel: function(model) {
      this._super.apply(this, arguments)

      var title = config.siteName

      $(document).attr('title', title)
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
