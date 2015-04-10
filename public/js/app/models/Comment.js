define(["app/app",
        "moment"], function(App, moment) {
  "use strict";

  App.Comment = DS.Model.extend({
    identifier: DS.attr('string'),
    body: DS.attr('string'),
    createdAt: DS.attr('number'),
    updatedAt: DS.attr('number'),

    createdBy: DS.belongsTo('user'),
    post: DS.belongsTo('post'),
    postId: DS.attr('string'),

    createdAgo: function() {
      if (this.get('createdAt')) {
        return moment(this.get('createdAt')).fromNow()
      }
    }.property('createdAt')
  })
})
