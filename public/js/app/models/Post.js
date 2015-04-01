define(["config",
        "moment",
        "app/app"], function(config, moment, App) {
  "use strict";

  App.Post = DS.Model.extend({
    resourceUrl: config.host + '/v1/posts',

    identifier: DS.attr('string'),
    body: DS.attr('string'),
    createdAt: DS.attr('number'),
    updatedAt: DS.attr('number'),

    createdBy: DS.belongsTo('user'),
    attachments: DS.hasMany('attachment'),
    comments: DS.hasMany('comment'),
    likes: DS.hasMany('user'),
    groups: DS.hasMany('group'),

    isHidden: DS.attr('string'),

    timeline: DS.belongsTo('timeline'),

    createdAgo: function() {
      if (this.get('createdAt')) {
        return moment(this.get('createdAt')).fromNow()
      }
    }.property('createdAt'),

    like: function() {
      return Ember.$.ajax({
        url: this.resourceUrl + '/' + this.get('id') + '/like',
        type: 'post'
      })
    },

    unlike: function() {
      return Ember.$.ajax({
        url: this.resourceUrl + '/' + this.get('id') + '/unlike',
        type: 'post'
      })
    }
  })
})
