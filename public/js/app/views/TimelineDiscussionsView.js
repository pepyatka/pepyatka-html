define(["app/app",
        "text!templates/timelineDiscussionsTemplate.handlebars",
        "views/AuthorizedView"], function(App, tpl) {
  "use strict";

  App.TimelineDiscussionsView = App.AuthorizedView.extend({
    templateName: 'timeline/discussions',
    template: Ember.Handlebars.compile(tpl)
  })
})
