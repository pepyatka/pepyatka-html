define(["app/app"], function(App) {
  App.PostSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
      // Include 'attachments' property in request when it sends newly created post to the backend
      attachments: { serialize: 'ids' }
    }
  })
})
