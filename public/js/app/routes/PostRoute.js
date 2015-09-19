define(["config",
        "app/app",
        "ember",
        "mixins/CustomErrorRoute"], function(config, App, Ember) {
  "use strict";

  App.PostRoute = Ember.Route.extend(App.CustomErrorRoute, {
    deactivate: function() {
      this.get('pubsub').unsubscribe()
    },

    model: function(params) {
      return this.store.findOneQuery('post', params.postId, { maxComments: 'all' })
    },

    afterModel: function(model) {
      this._super.apply(this, arguments)

      var text = model.get('body').substr(0, 60)

      var screenName = model.get('createdBy.screenName')
      var username = model.get('createdBy.username')
      var author =
        screenName +
        (username !== screenName ? ' (' + username + ')' : '')

      var title =
        text + ' - ' +
        author + ' - ' +
        config.siteName

      $(document).attr('title', title)
    },

    setupController: function(controller, model) {
      this.get('pubsub').set('channel', model)

      controller.set('model', model)
    }
  })
})
