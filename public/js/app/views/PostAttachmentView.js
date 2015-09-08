define(["app/app",
        "text!templates/postAttachmentTemplate.handlebars"], function(App, tpl) {
  App.PostAttachmentView = Ember.View.extend({
    templateName: 'post-attachment',
    template: Ember.Handlebars.compile(tpl),

    didInsertElement: function() {
      var that = this;

      this.$().on('upload-progress', function (event) {
        that.get('controller').send('updateUploadProgress', event.fileName, event.percentComplete);
      });
    }
  })
})
