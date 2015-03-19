define(["app/app"], function(App) {
  "use strict";

  App.Comment = DS.Model.extend({
    identifier: DS.attr('string'),
    body: DS.attr('string'),
    createdAt: DS.attr('string'),
    updatedAt: DS.attr('string'),
    createdBy: DS.attr('string'),

    post: DS.belongsTo('post')
  })
})
