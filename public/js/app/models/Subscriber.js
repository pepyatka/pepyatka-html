define(["app/app"], function(App) {
  "use strict";

  App.Subscriber = DS.Model.extend({
    username: DS.attr('string'),
    screenName: DS.attr('string'),
    type: DS.attr('string')
  })
})
