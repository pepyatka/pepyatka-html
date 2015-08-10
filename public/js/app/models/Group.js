define(["app/app"], function(App) {
  "use strict";

  App.Group = DS.Model.extend({
    username: DS.attr('string'),
    screenName: DS.attr('string'),
    type: DS.attr('string'),
    timelines: DS.hasMany('subscription'),
    administrators: DS.hasMany('admin'),

    isGroup: function() {
      return this.get('type') === 'group'
    }.property(),

    isUser: function() {
      return !this.get('isGroup')
    }.property()
  })
})
