define(["lodash",
        "app/app",
        'moment'], function(_, App, moment) {
  "use strict";

  App.User = DS.Model.extend({
    username: DS.attr('string'),
    type: DS.attr('string'),
    screenName: DS.attr('string'),
    email: DS.attr('string'),
    statistics: DS.attr(),
    subscriptions: DS.hasMany('subscription'),
    createdAt: DS.attr('number'),
    updatedAt: DS.attr('number'),

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
    }.property('subscriptions.@each'),

    updatedAgo: function() {
      if (this.get('updatedAt')) {
        return moment(this.get('updatedAt')).fromNow()
      }
    }.property('updatedAt')
  })
})
