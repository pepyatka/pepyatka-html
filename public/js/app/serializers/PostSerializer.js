define(["app/app"], function(App) {
  App.PostSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
      // Include 'attachments' property in request when it sends newly created post to the backend
      attachments: { serialize: 'ids' }
    },

    serializeIntoHash: function(data, type, snapshot, options) {
      this._super(data, type, snapshot, options)

      var record = snapshot.record

      if (record.get('feeds')) {
        data.meta = {
          feeds: record.get('feeds')
        }
      }
    }
  })
})
