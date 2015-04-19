define(["config", "app/app"], function(config, App) {
  "use strict";

  Ember.Application.initializer({
    name: 'session',
    after: "store",

    initialize: function(container, application) {
      application.deferReadiness()

      App.Session = Ember.Object.extend({
        resourceUrl: config.host + '/v1/users/whoami',
        currentUser: null,

        init: function() {
          this._super()

          var token = window.localStorage.getItem('authToken')
          this.set('authToken', token) // this won't trigger authTokenChanged
          this.set('signedIn', false)
          this.authTokenChanged()
        },

        reset: function() {
          this.set('authToken', null)
          this.set('currentUser', null)
          this.set('signedIn', false)
        },

        authTokenChanged: function(callback) {
          var done = function(result) {
            var store = container.lookup('store:main')
            store.pushPayload('user', result)
            store.find('user', result.users.id)
              .then(function(user) {
                this.set('currentUser', user)
              }.bind(this))

            this.set('signedIn', true)

            if (callback) callback();
            application.advanceReadiness()
          }

          var error = function() {
            if (callback) callback();
            application.advanceReadiness()
          }

          window.localStorage.setItem('authToken', this.get('authToken'))

          if (this.get('authToken')
              && this.get('authToken').length > 0
              && this.get('authToken') != 'null')
            Ember.$.ajax({
              url: this.resourceUrl,
              context: this
            })
            .then(done, error)
          else
            error()
        }
      }).create()

      application.register('user:session', App.Session, { instantiate: false, singleton: true })
      application.inject('route', 'session', 'user:session')
      application.inject('controller', 'session', 'user:session')
    }
  })
})
