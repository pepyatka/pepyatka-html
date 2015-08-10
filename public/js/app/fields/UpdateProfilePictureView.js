define(["app/app"], function(App) {
  "use strict";

  App.UpdateProfilePictureComponent = Ember.Component.extend({
    tagName: 'input',
    type: 'file',
    attributeBindings: ['type'],

    change: function(event) {
      if (event.target.files.length > 0) {
        // Send the file object to controller
        var newFile = event.target.files[0]
        this.get('controller').send('previewProfilePicture', newFile)
      }
    }
  })
})
