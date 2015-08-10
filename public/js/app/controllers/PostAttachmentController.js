define(["app/app",
        "ember",
        "numeral",
        "controllers/ApplicationController"], function(App, Ember, numeral) {
  "use strict";

  App.PostAttachmentController = App.ApplicationController.extend({
    nameAndSize: function() {
      var fileName = this.get('model.fileName')
      var fileSize = this.get('model.fileSize')
      fileSize = numeral(fileSize).format('0.[0] b')
      return fileName + ' (' + fileSize + ')'
    }.property('model.fileName', 'model.fileSize'),

    audioTitle: function() {
      var fileName = this.get('model.fileName')
      var title = this.get('model.title')
      var artist = this.get('model.artist')

      var fileSize = this.get('model.fileSize')
      fileSize = numeral(fileSize).format('0.[0] b')

      if (title && artist) {
        return artist + ' – ' + title + ' (' + fileSize + ')'
      } else if (title) {
        return title + ' (' + fileSize + ')'
      } else {
        return fileName + ' (' + fileSize + ')'
      }
    }.property('model.fileName', 'model.fileSize', 'model.title', 'model.artist')
  })
})
