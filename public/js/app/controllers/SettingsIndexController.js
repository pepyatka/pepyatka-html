define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  App.SettingsIndexController = Ember.Controller.extend({
    screenName: Ember.computed.oneWay('model.screenName'),
    isPrivate: Ember.computed.oneWay('model.isPrivate'),

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

      previewProfilePicture: function (newFile) {
        this.set('newProfilePicture', newFile)
      },

      updateProfilePicture: function () {
        var that = this

        var picture = this.get('newProfilePicture')
        if (!picture) return

        var data = new FormData()
        data.append('file', picture)

        Ember.$.ajax({
          url: config.host + '/v1/users/updateProfilePicture',
          type: 'post',
          data: data,
          processData: false,
          contentType: false,
          context: this
        })
          .then(function (res) {
            // TODO[yole] update model, avoid full page refresh
            window.location.reload(true)
          }, function (err) {
            if (err.responseJSON.err)
              this.set('profilePicErrors', err.responseJSON.err)
          })
      }
    }
  })
})
