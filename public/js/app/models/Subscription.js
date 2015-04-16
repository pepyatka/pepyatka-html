define(["app/app"], function(App) {
  "use strict";

  App.Subscription = DS.Model.extend({
    name: DS.attr('string'),
    admins: DS.attr('string'),

//    user: DS.belongsTo('user')
  })
})
