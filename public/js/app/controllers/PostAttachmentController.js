define(["app/app",
        "ember",
        "numeral"], function(App, Ember, numeral) {
  "use strict";

  App.PostAttachmentController = Ember.Controller.extend({
    tooltip: function() {
      var fileName = this.get('model.fileName')
      var fileSize = this.get('model.fileSize')
      fileSize = numeral(fileSize).format('0.[0] b')
      return fileName + ' (' + fileSize + ')'
    }.property()
  })
})
