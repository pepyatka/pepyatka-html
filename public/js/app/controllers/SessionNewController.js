define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  App.SessionNewController = Ember.Controller.extend({
    resourceUrl: config.host + '/v1/session',

    actions: {
      signin: function() {
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
            var user = this.store.recordForId('user', result.users.id)
            this.store.unloadRecord(user)
            user = this.store.createRecord('user', result.users)
            App.Session.set('currentUser', user)
          }, function() {
            // error
          })
      }
    }
  })
})
