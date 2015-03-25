define(["moment",
        "app/app"], function(moment, App) {
  "use strict";

  App.Post = DS.Model.extend({
    identifier: DS.attr('string'),
    body: DS.attr('string'),
    createdAt: DS.attr('number'),
    updatedAt: DS.attr('number'),
    createdBy: DS.attr('string'),

    attachments: DS.hasMany('attachment'),
    comments: DS.hasMany('comment'),
    likes: DS.hasMany('user'),
    groups: DS.hasMany('group'),

    timeline: DS.belongsTo('timeline'),

    createdAgo: function() {
      if (this.get('createdAt')) {
        return moment(this.get('createdAt')).fromNow()
      }
    }.property('createdAt')
  })
})
