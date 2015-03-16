define(["ember"
        , "ember-data"
        , "ember-template-compiler"
        , "bootstrap"
       ], function(Ember) {
  "use strict";

  var options = {}
  var App

  App = Ember.Application.create(options)
  App.deferReadiness()
  App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:3000',
    namespace: 'v1'
  });

  return App
})
