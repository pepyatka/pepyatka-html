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
    }.property('model.fileName', 'model.fileSize')
  })
})
