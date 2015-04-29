define(["app/app",
        "text!templates/postTitleTemplate.handlebars"], function(App, tpl) {
  App.PostTitleView = Ember.View.extend({
    templateName: 'post-title',
    template: Ember.Handlebars.compile(tpl)
  })
})
