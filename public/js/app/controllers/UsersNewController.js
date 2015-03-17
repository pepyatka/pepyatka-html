define(["config",
        "app/app"], function(config, App) {
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
            console.log(result)
            var user = this.store.createRecord('user', {
              username: result.users.username,
              screenName: result.users.screenName,
              identifier: result.users.id
            })
          }, function() {
            // error
          })
      }
    }
  })
})
