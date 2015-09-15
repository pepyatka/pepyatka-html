define(["config",
        "app/app",
        "ember",
        "controllers/ApplicationController"], function(config, App, Ember) {
  "use strict";

  App.BookmarkletController = App.ApplicationController.extend({
    queryParams: ['title', 'comment'],

    isSent: false,
    postData: null,

    actions: {
      send: function() {
        var data = {
          title: Ember.$('#bookmarklet-title').val(),
          image: Ember.$('#bookmarklet-image-url').val(),
          comment: Ember.$('#bookmarklet-comment').val()
        }
        Ember.$.ajax({
          url: config.host + '/v1/bookmarklet',
          data: data,
          type: 'post',
          context: this
        })
          .then(function(response) {
            this.set('postData', response)
            this.set('isSent', true)
          })
      }
    }
  })
})
