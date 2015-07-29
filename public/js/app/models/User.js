define(['config',
        'lodash',
        'app/app',
        'moment'], function(config, _, App, moment) {
  "use strict";

  App.User = DS.Model.extend({
    resourceUrl: config.host + '/v1/users',

    username: DS.attr('string'),
    type: DS.attr('string'),
    screenName: DS.attr('string'),
    email: DS.attr('string'),
    isPrivate: DS.attr('string'),
    statistics: DS.attr(),
    subscriptions: DS.hasMany('subscription'),
    // NOTE: this is a trick while we do not have user subscribers as is
    pendingSubscriptionRequests: DS.hasMany('request'),
    subscriptionRequests: DS.hasMany('request'),
    subscribers: DS.attr(),
    createdAt: DS.attr('number'),
    updatedAt: DS.attr('number'),
    profilePictureLargeUrl: DS.attr('string'),
    profilePictureMediumUrl: DS.attr('string'),
    // another HACK here, admin is always a user
    administrators: DS.hasMany('admin'),
    banIds: DS.attr(),

    isPrivateUser: function() {
      return this.get('isPrivate') === '1'
    }.property('isPrivate'),

    hasPendingSubscriptionRequests: function() {
      return this.get('subscriptionRequests').length > 0
    }.property('subscriptionRequests'),

    isSubscribed: function() {
      var currentUser = App.get('Session.currentUser')
      if (!currentUser) { return false }

      var subscriptions = currentUser.get('subscriptions').toArray()
      return (subscriptions.isAny('user.id', this.get('id'))) ||
        currentUser.get('id') === this.get('id')
    }.property('subscribers'),

    isPrivateUserAndNotSubscribed: function() {
      return this.get('isPrivateUser') && !this.get('isSubscribed')
    }.property('isPrivate', 'isSubscribed'),

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
      // `subscribers' field is just DS.attr() so it could be undefined
      // (unlike subscriptions, which is
      // DS.hasMany('subscription') so will be [])
      var subscribers = this.get('subscribers')
      var subscriberIds = []
      if (!Ember.isEmpty(subscribers))
        subscriberIds = _.map(this.get('subscribers').toArray(), 'id')
      var subscriptionIds = this.get('subscriptions').toArray()
      return _.filter(subscriptionIds, function(sub) {
        return sub.get('isPosts') &&
          (sub.get('user.isGroup') || subscriberIds.indexOf(sub.get('user.id')) >= 0)
      })
    }.property('subscriptions.@each', 'subscribers.@each'),

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
    }.property('screenName'),

    hasSentRequest: function() {
      var currentUser = App.get('Session.currentUser')
      var requests = currentUser.get('pendingSubscriptionRequests')
      return requests.indexOf(this.get('id')) >= 0
    }.property('pendingSubscriptionRequests'),

    sendRequest: function(user) {
      return Ember.$.ajax({
        url: this.resourceUrl + '/' + user.get('username') + '/sendRequest/',
        type: 'post',
        context: this
      })
        .then(function(res) {
          // var request = this.store.getById('request', user.get('id'))
          // this.get('pendingSubscriptionRequests').addObject(request)
        })
    },

    acceptRequest: function(user) {
      return Ember.$.ajax({
        url: this.resourceUrl + '/acceptRequest/' + user.get('username'),
        type: 'post',
        context: this
      })
        .then(function(res) {
          this.get('subscriptionRequests').removeObject(user)
        })
    },

    rejectRequest: function(user) {
      return Ember.$.ajax({
        url: this.resourceUrl + '/rejectRequest/' + user.get('username'),
        type: 'post',
        context: this
      })
        .then(function(res) {
          this.get('subscriptionRequests').removeObject(user)
        })
    }
  })
})
