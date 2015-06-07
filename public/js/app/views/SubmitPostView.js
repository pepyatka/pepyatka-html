define(["app/app",
        "text!templates/submitPostTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.SubmitPostView = Ember.View.extend({
    templateName: 'submit-post',
    template: Ember.Handlebars.compile(tpl),

    isDisabled: function() {
      return this.get('parentView.controller.isUploadingAttachment')
    }.property('parentView.controller.isUploadingAttachment'),
  })
})
