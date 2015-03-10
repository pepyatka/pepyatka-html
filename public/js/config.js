"use strict";

define({
  shim : {
    'ember': {
      deps: ['jquery'],
      exports: 'Ember'
    },
    'ember-data': {
      deps: ['ember'],
      exports: 'DS'
    },
    'ember-template-compiler': {
      deps: ['ember'],
      exports: 'Compiler'
    },
    'bootstrap': {
      deps: ['jquery']
    }
  },

  hbs: {
    disableI18n: true,
    templateExtension: 'handlebars'
  },

  paths : {
    /* application */
    'App': 'app/main',
    'models': 'app/models',
    'controllers': 'app/controllers',
    'routes': 'app/routes',
    'views': 'app/views',
    'templates': 'app/templates',

    /* libs */
    'jquery': 'libs/jquery/2.1.3/jquery.min',
    'bootstrap': 'libs/bootstrap/3.3.2/bootstrap.min',
    'ember': 'libs/emberjs/1.11.0-beta.1/ember.debug',
    'ember-data': 'libs/ember-data/1.0.0-beta.15/ember-data',
    'ember-template-compiler': 'libs/ember-template-compiler/1.12.0-beta.1/ember-template-compiler',
    'bootstrap': 'libs/bootstrap/3.3.2/bootstrap.min',

    /* requirejs-plugins */
    'hbs': 'libs/requirejs-plugins/hbs',
    'text': 'libs/requirejs-plugins/text'
  }
});
