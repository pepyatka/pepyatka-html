define(["config", "app/app"], function(config, App) {
  "use strict";

  DS.Store.reopen({
    findOneQuery: function(type, id, query) {
      var store = this

      var adapter = store.adapterFor(type)
      var serializer = store.serializerFor(type)
      var typeClass = store.modelFor(type)

      var url = adapter.buildURL(type, id)
      var ajaxPromise = adapter.ajax(url, 'GET', { data: query})

      return ajaxPromise.then(function(rawPayload) {
        var extractedPayload = serializer.extract(store, typeClass, rawPayload, id, 'find')
        return store.push(typeClass, extractedPayload)
      })
    }
  })
})
