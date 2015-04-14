define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  App.ResetPasswordController = Ember.Controller.extend({
    queryParams: ['token'],
    token: null,

    actions: {
      resetPassword: function() {
        Ember.$.ajax({
          url: config.host + '/v1/passwords/' + this.get('token'),
          type: 'put',
          data: {
            newPassword: this.get('newPassword'),
            passwordConfirmation: this.get('passwordConfirmation')
          },
          context: this
        })
          .then(function() {
          })
      }
    }
  })
})
