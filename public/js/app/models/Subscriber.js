define(["app/app"], function(App) {
  "use strict";

  App.Subscriber = DS.Model.extend({
    identifier: DS.attr('string'),
  });
})
