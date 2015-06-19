define(["config",
        "app/app",
        "ember",
        "controllers/SettingsGenericController"], function(config, App, Ember) {
  "use strict";

  App.SettingsFeedController = App.SettingsGenericController.extend({
    screenName: Ember.computed.oneWay('model.screenName'),

    title: function() {
      return 'Settings'
    }.property(),

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
      },

      updateProfilePicture: function () {
        var username = this.get('model').get('username')
        this.uploadProfilePicture('/v1/groups/' + username + '/updateProfilePicture')
      }
    }
  })
})
