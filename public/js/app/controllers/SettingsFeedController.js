define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  App.SettingsFeedController = Ember.Controller.extend({
    screenName: Ember.computed.oneWay('model.screenName'),

    actions: {
      update: function() {
        var feed = this.get('model')
        feed.set('screenName', this.get('screenName'))

        feed.save()
          .then(function(newFeed) {
          }.bind(this))
      }
    }
  })
})
