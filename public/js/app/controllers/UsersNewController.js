define(["config",
        "app/app"], function(config, App) {
  "use strict";

  App.UsersNewController = Ember.Controller.extend({
    resourceUrl: config.host + '/v1/users',
    errors: null,

    actions: {
      signup: function() {
        this.set('errors', null)

        var data = { username: this.get('username'),
                     password: this.get('password') }
        Ember.$.ajax({
          url: this.resourceUrl,
          data: data,
          type: 'post',
          context: this
        })
          .then(function(result) {
            App.Session.set('authToken', result.authToken)
          }, function(err) {
            this.set('errors', JSON.parse(err.responseText).err)
          })
      }
    }
  })
})
