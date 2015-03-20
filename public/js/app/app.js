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

  // TODO: this document
  // http://emberjs.com/api/data/classes/DS.RESTAdapter.html#toc_headers-customization
  // describes how we can set headers in RESTAdapter and so make
  // App.Session slimer
  App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:3000',
    namespace: 'v1'
  })

  return App
})
