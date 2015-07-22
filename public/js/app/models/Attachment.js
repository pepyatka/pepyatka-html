define(["app/app"], function(App) {
  "use strict";

  App.Attachment = DS.Model.extend({
    file: DS.attr('file'), // FormData File object
    url: DS.attr('string'),
    thumbnailUrl: DS.attr('string'),
    fileName: DS.attr('string'),
    fileSize: DS.attr('number'),
    mediaType: DS.attr('string'),

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
    }.property('mediaType'),

    formatSize: function() {
      var decimals = 2
      var bytes = this.get('fileSize')

      if (bytes == 0) return '0 Byte'
      var k = 1000
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      var i = Math.floor(Math.log(bytes) / Math.log(k))
      return (bytes / Math.pow(k, i)).toFixed(decimals) + ' ' + sizes[i]
    }.property('fileSize')
  })
})
