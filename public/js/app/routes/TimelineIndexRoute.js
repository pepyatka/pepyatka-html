define(["config",
        "app/app",
        "mixins/CustomErrorRoute"], function(config, App) {
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

    afterModel: function(model) {
      this._super.apply(this, arguments)

      var screenName = model.get('user.screenName')
      var username = model.get('user.username')
      var author =
        screenName +
        (username !== screenName ? ' (' + username + ')' : '')

      var title =
        author + ' - ' +
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
