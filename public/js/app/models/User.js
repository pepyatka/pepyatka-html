define(["app/app"], function(App) {
  "use strict";

  App.User = DS.Model.extend({
    identifier: DS.attr('string'),
    username: DS.attr('string'),
    type: DS.attr('string'),
    screenName: DS.attr('string'),
    statistics: DS.attr()
  })
})
