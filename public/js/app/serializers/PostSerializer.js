define(["app/app"], function(App) {
  App.PostSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
      // Include 'attachments' property in request when it sends newly created post to the backend
      attachments: { serialize: 'ids' }
    },

    serializeIntoHash: function(data, type, record, options) {
      this._super(data, type, record, options)

      if (record.get('feeds')) {
        data.meta = {
          feeds: record.get('feeds')
        }
      }
    }
  })
})
