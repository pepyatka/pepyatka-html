define(["app/app"], function(App) {
  "use strict";

  App.Timeline = DS.Model.extend({
    name: DS.attr('string'),
    subscribers: DS.attr('string'),

    posts: DS.hasMany('post'),
    user: DS.belongsTo('user')
  })
})
