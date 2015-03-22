define(["app/app"], function(App) {
  "use strict";

  App.Subscriber = DS.Model.extend({
    identifier: DS.attr('string'),
    username: DS.attr('string'),
    screenName: DS.attr('string')
  })
})
