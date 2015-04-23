define(["app/app"], function(App) {
  "use strict";

  App.Attachment = DS.Model.extend({
    url: DS.attr('string'),
    thumbnailUrl: DS.attr('string'),
    fileName: DS.attr('string'),
    fileSize: DS.attr('number'),

    createdAt: DS.attr('string'),
    updatedAt: DS.attr('string'),

    createdBy: DS.belongsTo('user'),
    post: DS.belongsTo('post')
  })
})
