define(["app/app",
        "text!templates/timelineLikesTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.TimelineLikesView = App.AuthorizedView.extend({
    templateName: 'timeline/likes',
    template: Ember.Handlebars.compile(tpl)
  })
})
