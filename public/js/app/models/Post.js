define(["app/app"], function(App) {
  "use strict";

  App.Post = DS.Model.extend({
    identifier: DS.attr('string'),
    body: DS.attr('string'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),
    createdBy: DS.attr('string'),

    attachments: DS.hasMany('attachment'),
    comments: DS.hasMany('comment'),
    likes: DS.hasMany('user'),
    groups: DS.hasMany('group'),

    timeline: DS.belongsTo('timeline')
  })
})
