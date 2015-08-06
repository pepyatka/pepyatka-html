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

    actions: {
      send: function() {
        var imageUrl = Ember.$('#p_image_src').attr('value')
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
            this.set('isSent', true)
          })
      }
    }
  })
})
