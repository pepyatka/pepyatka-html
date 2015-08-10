define(["app/app",
        "models/User"], function(App) {
  "use strict";

  // App.Admin = App.User.extend({
  // })
  App.Admin = DS.Model.extend({
    username: DS.attr('string'),
    screenName: DS.attr('string'),
    type: DS.attr('string'),

    isGroup: function() {
      return this.get('type') !== 'group'
    }.property(),

    isUser: function() {
      return !this.get('isGroup')
    }.property()
  })
})
