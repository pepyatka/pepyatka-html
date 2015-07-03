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
    profilePictureLargeUrl: DS.attr('string'),
    profilePictureMediumUrl: DS.attr('string'),
    administratorIds: DS.attr(),
    banIds: DS.attr(),

    hasPosts: function() {
      return this.get('statistics.posts') > 0
    }.property('statistics.posts'),

    hasLikes: function() {
      return this.get('statistics.likes') > 0
    }.property('statistics.likes'),

    hasComments: function() {
      return this.get('statistics.comments') > 0
    }.property('statistics.comments'),

    hasSubscriptions: function() {
      return this.get('statistics.subscriptions') > 0
    }.property('statistics.subscriptions'),

    hasSubscribers: function() {
      return this.get('statistics.subscribers') > 0
    }.property('statistics.subscribers'),

    isGroup: function() {
      return this.get('type') === 'group'
    }.property(),

    isUser: function() {
      return !this.get('isGroup')
    }.property(),

    profilePictureLarge: function() {
      var url = this.get('profilePictureLargeUrl')
      if (_.isEmpty(url)) {
        return '/img/default-userpic-75.png'
      }
      return url
    }.property('profilePictureLargeUrl'),

    profilePictureMedium: function() {
      var url = this.get('profilePictureMediumUrl')
      if (_.isEmpty(url)) {
        return '/img/default-userpic-48.png'
      }
      return url
    }.property('profilePictureMediumUrl'),

    feeds: function() {
      return _.filter(this.get('subscriptions').toArray(), function(subscription) {
        return subscription.get('isPosts')
      })
    }.property('subscriptions.@each'),

    groups: function() {
      return _.filter(this.get('subscriptions').toArray(), function(subscription) {
        return subscription.get('user.isGroup') &&
          subscription.get('isPosts')
      })
    }.property('subscriptions.@each'),

    recentGroups: function() {
      return this.get('groups').slice(0, 4)
    }.property('groups'),

    updatedAgo: function() {
      if (this.get('updatedAt')) {
        return moment(this.get('updatedAt')).fromNowOrNow()
      }
    }.property('updatedAt'),

    inTitleName: function() {
      var shortName = this.get('screenName')
      if (this.get('isUser')) {
        shortName = shortName.split(' ')[0] + "'"
        if (shortName[shortName.length - 2] !== 's') {
          shortName = shortName + "s"
        }
        shortName += " feed"
      }
      return shortName
    }.property('screenName'),

    screenNameOrYou: function() {
      if (App.get('Session.currentUser.id') === this.get('id'))
        return 'You'

      return this.get('screenName')
    }.property('screenName')
  })
})
