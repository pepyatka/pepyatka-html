define(["app/app"], function(App) {
  "use strict";

  App.Router.map(function() {
    this.route('home', { path: '/about'})
    this.resource('session', function() {
      this.route('new', { path: '/signin' })
      this.route('destroy', { path: '/logout' })
    })
    this.resource('users', function() {
      this.route('new', { path: '/signup' })
    })
    this.resource('timeline', { path: '/' }, function() {
      this.route('index', { path: '/:username' })
      this.route('comments', { path: '/:username/comments' })
      this.route('likes', { path: '/:username/likes' })
      this.route('subscribers', { path: '/:username/subscribers' })
    })
    this.resource('groups', { path: '/groups'})
  })
})
