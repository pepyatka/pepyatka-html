define(["app/app",
        "text!templates/postsTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.PostsView = Ember.View.extend({
    templateName: 'posts',
    template: Ember.Handlebars.compile(tpl)
  })
})
