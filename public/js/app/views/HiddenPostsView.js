define(["app/app",
  "text!templates/hiddenPostsTemplate.handlebars"], function(App, tpl) {
  App.HiddenPostsView = Ember.View.extend({
    templateName: 'hiddenPosts',
    template: Ember.Handlebars.compile(tpl),
    classNameBindings: ['controller.hiddenPostsShown::hide']
  })
});
