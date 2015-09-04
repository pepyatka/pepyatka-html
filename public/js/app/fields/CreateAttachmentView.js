define(["app/app",
        "text!templates/createAttachmentTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.CreateAttachmentView = Ember.View.extend({
    template: Ember.Handlebars.compile(tpl),

    change: function(event) {
      if (event.target.files.length > 0) {
        // Send the file object(s) to controller
        var newFiles = event.target.files
        for (var i=0; i<newFiles.length; i++) {
          this.get('controller').send('addAttachment', newFiles[i])
        }

        // Clear the file input in DOM: 1) wrap with the form, 2) reset the form, 3) unwrap
        this.$().wrap('<form>').closest('form').get(0).reset()
        this.$().unwrap()
      }
    }
  })
})
