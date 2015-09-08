define(["app/app",
        "ember",
        "numeral",
        "controllers/ApplicationController"], function(App, Ember, numeral) {
  "use strict";

  App.PostAttachmentController = App.ApplicationController.extend({

    // 'uploadProgress' should be an instance property (set on init), not a prototype property
    setupUploadProgress: function() {
      this.set('uploadProgress', 0);
    }.on('init'),

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
    }.property('model.fileName', 'model.fileSize', 'model.title', 'model.artist'),

    actions: {
      updateUploadProgress: function(fileName, percentComplete) {
        // Only update progress if the event is intended for current file
        if (this.get('model.fileName') === fileName) {
          this.set('uploadProgress', percentComplete)
        }
      }
    }
  })
})
