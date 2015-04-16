define(["app/app"], function(App) {
  "use strict";

  App.Subscriber = DS.Model.extend({
    username: DS.attr('string'),
    screenName: DS.attr('string'),
    type: DS.attr('string'),

    isGroup: function() {
      return this.get('type') === 'group'
    }.property(),

    isUser: function() {
      return !this.isGroup()
    }.property()
  })
})
