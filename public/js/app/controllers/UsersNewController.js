define(["config",
        "app/app"], function(config, App) {
  "use strict";

  App.UsersNewController = Ember.Controller.extend({
    resourceUrl: config.host + '/v1/users',

    actions: {
      signup: function() {
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
            var user = this.store.createRecord('user', result.users)
          }, function() {
            // error
          })
      }
    }
  })
})