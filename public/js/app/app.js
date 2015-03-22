define(["ember"
        , "ember-data"
        , "ember-template-compiler"
        , "bootstrap"
       ], function(Ember) {
  "use strict";

  var options = {}
    , App

  App = Ember.Application.create(options)
  App.deferReadiness()

  return App
})
