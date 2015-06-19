define(["config",
        "auth_storage",
        "app/app",
        "ember"], function(config, auth_storage, App, Ember) {
  "use strict";

  Ember.$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    var authToken = auth_storage.getStoredToken()
    jqXHR.setRequestHeader('X-Authentication-Token', authToken)
  })

  Ember.$.ajaxSetup({
    url: config.host
  })
})
