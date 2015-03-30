define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  App.PostAttachmentController = Ember.Controller.extend({
    originalUrlPrefix: config.host + '/attachments/original/',
    previewUrlPrefix: config.host + '/attachments/preview/'
  })
})
