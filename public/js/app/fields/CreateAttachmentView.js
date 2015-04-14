define(["app/app"], function(App) {
  "use strict";

  App.CreateAttachmentView = Ember.View.extend({
    tagName: 'input',
    type: 'file',
    attributeBindings: ['type'],

    change: function(event) {
      if (event.target.files.length > 0) {
        // Send the file object to controller
        var newFile = event.target.files[0]
        this.get('controller').send('addAttachment', newFile)

        // Clear the file input in DOM: 1) wrap with the form, 2) reset the form, 3) unwrap
        this.$().wrap('<form>').closest('form').get(0).reset()
        this.$().unwrap()
      }
    }
  })
})
