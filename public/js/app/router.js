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
      this.route('home', { path: '/' })
      this.route('directs', { path: '/filter/direct' })
      this.route('discussions', { path: '/filter/discussions' })
      this.route('index', { path: '/:username' })
      this.route('comments', { path: '/:username/comments' })
      this.route('likes', { path: '/:username/likes' })
      this.route('subscribers', { path: '/:username/subscribers' })
      this.route('subscriptions', { path: '/:username/subscriptions' })
    })
    this.resource('settings', { path: '/settings' }, function() {
      this.route('index', { path: '/' })
      this.route('feed', { path: '/:username' })
    })
    this.route('forgot-password', { path: '/account/password' })
    this.route('reset-password', { path: '/account/reset' })
    this.route('post', { path: '/:username/:postId' })
    this.resource('groups', { path: '/groups' }, function() {
      this.route('home', { path: '/' })
      this.route('new', { path: '/new' })
    })
    this.route('not-found', { path: '/404'})
  })

  App.Router.reopen({
    location: 'history'
  })

  App.Router.reopen({
    notifyGoogleAnalytics: function() {
      return ga('send', 'pageview', {
          'page': this.get('url'),
          'title': this.get('url')
        });
    }.on('didTransition')
  });
})
