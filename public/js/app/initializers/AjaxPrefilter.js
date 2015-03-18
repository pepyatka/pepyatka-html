define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  Ember.$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    var authToken = window.localStorage.getItem('authToken')
    jqXHR.setRequestHeader('X-Authentication-Token', authToken)
  })

  Ember.$.ajaxSetup({
    url: config.host
  })
})
