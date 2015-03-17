define(["app/app"], function(App) {
  "use strict";

  Ember.Application.initializer({
    name: 'session',

    initialize: function(container, application) {
      App.Session = Ember.Object.extend({
        init: function() {
          this._super()
          var token = window.localStorage.getItem('authToken')
          this.set('authToken', token)
        },

        authTokenChanged: function() {
          window.localStorage.setItem('authToken', this.get('authToken'))
        }.observes('authToken')
      }).create()
    }
  })
})
