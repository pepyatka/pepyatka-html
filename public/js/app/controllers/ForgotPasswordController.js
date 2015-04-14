define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  App.ForgotPasswordController = Ember.Controller.extend({
    actions: {
      resetPassword: function() {
        Ember.$.ajax({
          url: config.host + '/v1/passwords',
          type: 'post',
          data: {
            email: this.get('email')
          },
          context: this
        })
          .then(function() {
          })
      }
    }
  })
})
