define(["app/app"], function(App) {
  "use strict";

  App.TimelineCommentsRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find('timeline', params.username + '/comments')
    }
  })
})
