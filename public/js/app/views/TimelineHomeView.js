define(["app/app",
        "text!templates/timelineHomeTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.TimelineHomeView = App.AuthorizedView.extend({
    templateName: 'timeline/home',
    template: Ember.Handlebars.compile(tpl),

    hiddenPostsShown: false,

    isRiverOfNews: function() {
      return true
    }.property(),

    actions: {
      toggleShowHidden: function() {
        this.toggleProperty('hiddenPostsShown')
      }
    }
  })
})
