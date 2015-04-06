define(["app/app"], function(App) {
  App.FileTransform = DS.Transform.extend({
    // Just leave the file untouched
    deserialize: function(serialized) {
      return serialized
    },
    serialize: function(deserialized) {
      return deserialized
    }
  })
})
