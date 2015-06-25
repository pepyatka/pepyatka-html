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
    },
    'jquery.anchorlinks': {
      deps: ['jquery', 'linkify']
    },
    'momentjs.relativeTime': {
      deps: ['moment']
    },
    'linkify-jquery': {
      deps: ['jquery']
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
    'helpers': 'app/helpers',
    'initializers': 'app/initializers',
    'layouts': 'app/layouts',
    'models': 'app/models',
    'routes': 'app/routes',
    'serializers': 'app/serializers',
    'templates': 'app/templates',
    'transforms': 'app/transforms',
    'views': 'app/views',

    /* libs */
    'jquery': 'libs/jquery/2.1.4/jquery.min',
    'bootstrap': 'libs/bootstrap/3.3.4/bootstrap.min',
    'ember': 'libs/emberjs/1.11.3/ember.debug',
    'ember-data': 'libs/ember-data/1.0.0-beta.18/ember-data',
    'ember-template-compiler': 'libs/ember-template-compiler/1.11.3/ember-template-compiler',
    'autosize': 'libs/autosize/3.0.5/autosize.min',
    'moment': 'libs/momentjs/2.9.0/moment.min',
    'numeral': 'libs/numeraljs/1.5.3/numeral.min',
    'socket.io': 'libs/socket.io/1.3.5/socket.io.min',
    'select2': 'libs/select2/4.0.0-rc.2/select2.min',
    'lodash': 'libs/lodash/3.7.0/lodash.min',
    'linkify-jquery': 'libs/linkify/2.0.0-alpha.3/linkify-jquery.amd.min',
    'linkify': 'libs/linkify/2.0.0-alpha.3/linkify.amd.min',
    'jquery.anchorlinks': 'libs/plugins/jquery.anchorlinks',
    'momentjs.relativeTime': 'libs/plugins/momentjs.relativeTime',

    /* requirejs-plugins */
    'hbs': 'libs/requirejs-plugins/hbs',
    'text': 'libs/requirejs-plugins/text'
  }
})
