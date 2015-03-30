define(["app/app",
        "text!templates/postAttachmentTemplate.handlebars"], function(App, tpl) {
  App.PostAttachmentView = Ember.View.extend({
    templateName: 'post-attachment',
    template: Ember.Handlebars.compile(tpl)
  })
})
