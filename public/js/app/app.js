define(["ember"
        , "ember-data"
        , "ember-template-compiler"
        , "bootstrap"
        , "moment"
        , "text"
        , "socket.io"
        , "select2"
        , "lodash"
        , "jquery.anchorlinks"
        , "momentjs.relativeTime"
        , "numeral"
       ], function(Ember) {
  "use strict";

  var options = {
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true,
    rootElement: '#ember-app',
    ready: function () {
      $("#ember-app").empty();
    }
  }
  var App

  App = Ember.Application.create(options)
  App.deferReadiness()

  return App
})
