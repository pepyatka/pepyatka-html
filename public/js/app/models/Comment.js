define(["app/app",
        "moment"], function(App, moment) {
  "use strict";

  App.Comment = DS.Model.extend({
    body: DS.attr('string'),
    createdAt: DS.attr('number'),
    updatedAt: DS.attr('number'),

    createdBy: DS.belongsTo('user', {async:false}),
    post: DS.belongsTo('post', {async:false}),
    postId: DS.attr('string'),

    createdAgo: function() {
      if (this.get('createdAt')) {
        return moment(this.get('createdAt')).fromNowOrNow()
      }
    }.property('createdAt'),

    createdAtISO: function() {
      if (this.get('createdAt')) {
        return moment(this.get('createdAt')).format()
      }
    }.property('createdAt'),

  })
})
