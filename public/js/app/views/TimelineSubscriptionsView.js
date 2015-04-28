define(["app/app",
        "text!templates/timelineSubscriptionsTemplate.handlebars",
        "views/AuthorizedView"], function(App, tpl) {
  "use strict";

  App.TimelineSubscriptionsView = App.AuthorizedView.extend({
    templateName: 'timeline/subscriptions',
    template: Ember.Handlebars.compile(tpl)
  })
})
