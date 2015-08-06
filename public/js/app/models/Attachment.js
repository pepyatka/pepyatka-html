define(["app/app"], function(App) {
  "use strict";

  App.Attachment = DS.Model.extend({
    file: DS.attr('file'), // FormData File object
    url: DS.attr('string'),
    thumbnailUrl: DS.attr('string'),
    fileName: DS.attr('string'),
    fileSize: DS.attr('number'),
    mediaType: DS.attr('string'),

    title: DS.attr('string'),
    artist: DS.attr('string'),

    createdAt: DS.attr('string'),
    updatedAt: DS.attr('string'),

    createdBy: DS.belongsTo('user'),
    post: DS.belongsTo('post'),

    isImage: function() {
      return this.get('mediaType') === 'image' ||
        Ember.isEmpty(this.get('mediaType'))
    }.property('mediaType'),

    isGeneral: function() {
      return this.get('mediaType') === 'general'
    }.property('mediaType'),

    isAudio: function() {
      return this.get('mediaType') === 'audio'
    }.property('mediaType')
  })
})
