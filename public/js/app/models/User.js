define(["lodash",
        "app/app"], function(_, App) {
  "use strict";

  App.User = DS.Model.extend({
    username: DS.attr('string'),
    type: DS.attr('string'),
    screenName: DS.attr('string'),
    email: DS.attr('string'),
    statistics: DS.attr(),
    subscriptions: DS.hasMany('subscription'),

    isGroup: function() {
      return this.get('type') === 'group'
    }.property(),

    isUser: function() {
      return !this.get('isGroup')
    }.property(),

    groups: function() {
      return _.filter(this.get('subscriptions.currentState'), function(subscription) {
        return subscription.get('user.isGroup') &&
          subscription.get('isPosts')
      })
    }.property()
  })
})
