define(["app/app"], function(App) {
  "use strict";

  App.Group = DS.Model.extend({
    username: DS.attr('string'),
    screenName: DS.attr('string'),
    type: DS.attr('string'),

    isGroup: function() {
      return true
    }.property(),

    isUser: function() {
      return !this.isGroup()
    }.property()
  })
})
