define(["config",
        "app/app",
        "ember",
        "controllers/ApplicationController"], function(config, App, Ember) {
  "use strict";

  App.ForgotPasswordController = App.ApplicationController.extend({
    actions: {
      resetPassword: function() {
        this.set('errors', null)
        this.set('message', null)

        Ember.$.ajax({
          url: config.host + '/v1/passwords',
          type: 'post',
          data: {
            email: this.get('email')
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
