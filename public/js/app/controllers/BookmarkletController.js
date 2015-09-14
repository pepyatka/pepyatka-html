define(["config",
        "app/app",
        "ember",
        "controllers/ApplicationController"], function(config, App, Ember) {
  "use strict";

  App.BookmarkletController = App.ApplicationController.extend({
    queryParams: ['title', 'comment'],

    comment: null,
    title: null,
    isSent: false,
    postData: null,

    actions: {
      send: function() {
        var imageUrl = Ember.$('#bookmarklet-image-url').attr('value')
        var data = {
          image: imageUrl,
          title: this.get('title'),
          comment: this.get('comment')
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
