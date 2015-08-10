define(["app/app",
        "text!templates/timelineSubscribersTemplate.handlebars",
        "views/AuthorizedView"], function(App, tpl) {
  "use strict";

  App.TimelineSubscribersView = App.AuthorizedView.extend({
    templateName: 'timeline/subscribers',
    template: Ember.Handlebars.compile(tpl)
  })
})
