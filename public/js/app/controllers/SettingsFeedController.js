define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  App.SettingsFeedController = Ember.Controller.extend({
    screenName: Ember.computed.oneWay('model.screenName'),

    actions: {
      update: function() {
        this.set('errors', null)
        this.set('message', null)

        var feed = this.get('model')
        feed.set('screenName', this.get('screenName'))

        feed.save()
          .then(function(newFeed) {
            this.set('message', 'Updated!')
          }.bind(this), function(err) {
            this.set('errors', err.responseJSON.err)
          }.bind(this))
      }
    }
  })
})
