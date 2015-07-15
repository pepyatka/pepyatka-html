define(["ember"
        , "ember-data"
        , "ember-template-compiler"
        , "bootstrap"
        , "moment"
        , "text"
        , "socket.io"
        , "select2"
        , "lodash"
        , "mediaelement"
        , "mediaelementplayer"
        , "jquery.anchorlinks"
        , "momentjs.relativeTime"
        , "linkify"
        , "linkify-jquery"
        , "numeral"
        , "autosize"
       ], function(Ember) {
  "use strict";

  var options = {
    LOG_TRANSITIONS: false,
    LOG_TRANSITIONS_INTERNAL: false,
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
