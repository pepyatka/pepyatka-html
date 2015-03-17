define(["app/app"], function(App) {
  "use strict";

  App.Router.map(function() {
    this.route('home', { path: '/'})
    this.resource('session', function() {
      this.route('new', { path: '/signin' })
      this.route('destroy', { path: '/logout' })
    })
    this.resource('users', function() {
      this.route('new', { path: '/signup' })
    })
    this.resource('groups', { path: '/groups'})
  })
})
