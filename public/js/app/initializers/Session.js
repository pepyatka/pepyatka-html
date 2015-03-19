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

        authTokenChanged: function() {
          var done = function(result) {
            var store = container.lookup('store:main')
            var user = store.createRecord('user', result.users)
            this.set('currentUser', user)
            this.set('signedIn', true)

            application.advanceReadiness()
          }

          var error = function() {
            application.advanceReadiness()
          }

          window.localStorage.setItem('authToken', this.get('authToken'))

          if (this.get('authToken')
              && this.get('authToken').length > 0)
            Ember.$.ajax({
              url: this.resourceUrl,
              context: this
            })
            .then(done, error)
          else
            error()
        }.observes('authToken')
      }).create()

      application.register('user:session', App.Session, { instantiate: false, singleton: true })
      application.inject('route', 'session', 'user:session')
      application.inject('controller', 'session', 'user:session')
    }
  })
})
