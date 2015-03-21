define(["app/app",
        "text!templates/postCommentTemplate.handlebars"], function(App, tpl) {
  App.PostCommentView = Ember.View.extend({
    templateName: 'post-comment',
    template: Ember.Handlebars.compile(tpl)
  })
})
