define(["app/app"], function(App) {
  "use strict";

  App.Group = DS.Model.extend({
    identifier: DS.attr('string'),
    username: DS.attr('string'),
    type: DS.attr('string'),
    info: DS.attr('string'),
    rss: DS.attr('string')
  })
})
