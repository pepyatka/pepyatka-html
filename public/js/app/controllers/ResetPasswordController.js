define(["config",
        "app/app",
        "ember",
        "controllers/ApplicationController"], function(config, App, Ember) {
  "use strict";

  App.ResetPasswordController = App.ApplicationController.extend({
    queryParams: ['token'],
    token: null,

    actions: {
      resetPassword: function() {
        this.set('errors', null)
        this.set('message', null)

        Ember.$.ajax({
          url: config.host + '/v1/passwords/' + this.get('token'),
          type: 'put',
          data: {
            newPassword: this.get('newPassword'),
            passwordConfirmation: this.get('passwordConfirmation')
          },
          context: this
        })
          .then(function(res) {
            if (res.message)
              this.set('message', res.message)
          }, function(err) {
            if (err.responseJSON.err)
              this.set('errors', err.responseJSON.err)
          })
      }
    }
  })
})
