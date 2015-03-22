define(["app/app"], function(App) {
  "use strict";

  App.PostRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find('post', params.postId)
    }
  })
})
