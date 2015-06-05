define(["app/app"], function(App) {
  "use strict";

  App.Timeline = DS.Model.extend({
    name: DS.attr('string'),
    subscribers: DS.hasMany('subscriber'),

    posts: DS.hasMany('post'),
    // NOTE: timeline.user always belongs to User model no matter what
    // user.type attribute is, i.e. even if user.type is set to
    // "group" timeline will still link it to User model. To do this
    // right we need to build polymorphic relationship based on type.
    user: DS.belongsTo('user')
  })
})
