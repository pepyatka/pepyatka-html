define(["app/app",
        "text!templates/timelineIndexTemplate.handlebars",
        "views/AuthorizedView"], function(App, tpl) {
  "use strict";

  App.TimelineIndexView = App.AuthorizedView.extend({
    templateName: 'timeline/index',
    template: Ember.Handlebars.compile(tpl)
  })
})
