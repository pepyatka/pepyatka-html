define(["config",
        "app/app",
        "ember",
        "controllers/SettingsGenericController"], function(config, App, Ember) {
  "use strict";

  App.SettingsIndexController = App.SettingsGenericController.extend({
    screenName: Ember.computed.oneWay('model.screenName'),
    isPrivate: Ember.computed.oneWay('model.isPrivate'),

    title: function() {
      return 'Settings'
    }.property(),

    actions: {
      update: function () {
        this.set('errors', null)
        this.set('message', null)

        var user = this.get('model')
        user.set('screenName', this.get('screenName'))
        user.set('isPrivate', this.get('isPrivate'))
        user.set('email', user.get('email'))

        user.save()
          .then(function (newUser) {
            this.set('message', 'Updated!')
          }.bind(this), function (err) {
            user.rollback()
            this.set('errors', err.responseJSON.err)
          }.bind(this))
      },

      updatePassword: function () {
        this.set('passwordErrors', null)
        this.set('passwordMessage', null)

        Ember.$.ajax({
          url: config.host + '/v1/users/updatePassword',
          type: 'post',
          data: {
            "_method": "put",
            currentPassword: this.get('currentPassword'),
            password: this.get('password'),
            passwordConfirmation: this.get('passwordConfirmation')
          },
          context: this
        })
          .then(function (res) {
            if (res.message)
              this.set('passwordMessage', res.message)
          }, function (err) {
            if (err.responseJSON.err)
              this.set('passwordErrors', err.responseJSON.err)
          })
      },

      updateProfilePicture: function () {
        this.uploadProfilePicture('/v1/users/updateProfilePicture')
      }
    }
  })
})
