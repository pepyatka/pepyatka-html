define(["app/app",
        "text!templates/timelineDiscussionsTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.TimelineDiscussionsView = Ember.View.extend({
    templateName: 'timeline/discussions',
    template: Ember.Handlebars.compile(tpl)
  })
})
