define(["app/app",
        "text!templates/timelineCommentsTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.TimelineCommentsView = Ember.View.extend({
    templateName: 'timeline/comments',
    template: Ember.Handlebars.compile(tpl)
  })
})
