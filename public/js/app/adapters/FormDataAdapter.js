define(["app/app",
        "adapters/ApplicationAdapter",
        "ember"], function(App, ApplicationAdapter, Ember) {

  // Adapter for sending data encoded as 'multipart/form-data' instead of JSON
  // (for submitting forms that contain files)
  App.FormDataAdapter = App.ApplicationAdapter.extend({
    ajaxOptions: function(url, type, options) {
      var hash = options || {}
      hash.url = url
      hash.type = type
      hash.dataType = 'json'
      hash.context = this

      var fileName = hash.data.attachment.file.name

      if (hash.data && type !== 'GET' && type !== 'DELETE') {
        hash.processData = false
        hash.contentType = false
        var fd = new FormData()
        var root = Ember.keys(hash.data)[0]
        Ember.keys(hash.data[root]).forEach(function(key) {
          if (hash.data[root][key]) {
            fd.append(root + '[' + key + ']', hash.data[root][key])
          }
        })
        hash.data = fd
      }

      var headers = this.get('headers')
      if (headers !== undefined) {
        hash.beforeSend = function(xhr) {
          Ember.keys(headers).forEach(function(key) {
            xhr.setRequestHeader(key, headers[key])
          })
        }
      }

      hash.xhr = function() {
        var xhr = new window.XMLHttpRequest()

        // Upload progress
        xhr.upload.addEventListener('progress', function(event) {
          if (event.lengthComputable) {
            var percentComplete = Math.round(event.loaded / event.total * 100)
            Ember.$('.create-post .attachment').trigger({
              type: 'upload-progress',
              fileName: fileName,
              percentComplete: percentComplete
            })
          }
        }, false)

        return xhr
      }

      return hash
    }
  })
})
