define(["app/app",
        "text!templates/submitPostTemplate.handlebars",
        "ember"], function(App, tpl, Ember) {
  "use strict";

  App.SubmitPostView = Ember.View.extend({
    templateName: 'submit-post',
    template: Ember.Handlebars.compile(tpl),

    isDisabled: function() {
      var attachments = this.get('parentView.controller.isUploadingAttachment')
      var empty = Ember.isBlank(this.get('createPost.value'))
      return attachments || empty
    }.property('parentView.controller.isUploadingAttachment', 'createPost.value'),
  })
})
