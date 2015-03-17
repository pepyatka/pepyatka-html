define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  Ember.$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    var authToken = window.localStorage.getItem('authToken')
    options.data = $.param($.extend(originalOptions.data, { authToken: authToken }))
  })

  Ember.$.ajaxSetup({
    url: config.host
  })
})
