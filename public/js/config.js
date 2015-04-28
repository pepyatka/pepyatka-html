"use strict";

define({
  host: "http://localhost:3000",
  waitSeconds: 0,

  shim: {
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
    },
    'lodash': {
      exports: '_'
    }
  },

  hbs: {
    disableI18n: true,
    templateExtension: 'handlebars'
  },

  config: {
    moment: {
      noGlobal: true
    }
  },

  paths: {
    /* application */
    'App': 'app/main',
    'adapters': 'app/adapters',
    'fields': 'app/fields',
    'controllers': 'app/controllers',
    'components': 'app/components',
    'initializers': 'app/initializers',
    'layouts': 'app/layouts',
    'models': 'app/models',
    'routes': 'app/routes',
    'serializers': 'app/serializers',
    'templates': 'app/templates',
    'transforms': 'app/transforms',
    'views': 'app/views',

    /* libs */
    'jquery': 'libs/jquery/2.1.3/jquery.min',
    'bootstrap': 'libs/bootstrap/3.3.2/bootstrap.min',
    'ember': 'libs/emberjs/1.11.0-beta.1/ember.debug',
    'ember-data': 'libs/ember-data/1.0.0-beta.15/ember-data',
    'ember-template-compiler': 'libs/ember-template-compiler/1.12.0-beta.1/ember-template-compiler',
    'moment': 'libs/momentjs/2.9.0/moment.min',
    'numeral': 'libs/numeraljs/1.5.3/numeral.min',
    'socket.io': 'libs/socket.io/1.3.5/socket.io.min',
    'select2': 'libs/select2/4.0.0-rc.2/select2.min',
    'lodash': 'libs/lodash/3.7.0/lodash.min',

    /* requirejs-plugins */
    'hbs': 'libs/requirejs-plugins/hbs',
    'text': 'libs/requirejs-plugins/text'
  }
})
