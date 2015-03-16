define(["app/app"], function(App) {
  "use strict";

  App.Comment = DS.Model.extend({
    identifier: DS.attr('string'),
    body: DS.attr('string'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),
    createdBy: DS.attr('string'),

    post: DS.belongsTo('post')
  })
})
