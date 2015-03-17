define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  Ember.$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    var token = window.localStorage.getItem('token')
    options.data = $.param($.extend(originalOptions.data, { token: token }))
  })

  Ember.$.ajaxSetup({
    url: config.host
  })
})
