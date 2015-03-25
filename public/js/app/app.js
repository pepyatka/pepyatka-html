define(["ember"
        , "ember-data"
        , "ember-template-compiler"
        , "bootstrap"
       ], function(Ember) {
  "use strict";

  var options = {
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true
  }
  var App

  App = Ember.Application.create(options)
  App.deferReadiness()

  return App
})
