define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  App.SessionNewController = Ember.Controller.extend({
    resourceUrl: config.host + '/v1/session',
    errors: null,

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
            this.set('errors', null)

            this.transitionToRoute('timeline.home')
          }, function(err) {
            this.set('errors', JSON.parse(err.responseText).err)
          })
      }
    }
  })
})
