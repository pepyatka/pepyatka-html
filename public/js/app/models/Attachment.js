define(["app/app"], function(App) {
  "use strict";

  App.Attachment = DS.Model.extend({
    identifier: DS.attr('string'),

    post: DS.belongsTo('post')
  })
})
