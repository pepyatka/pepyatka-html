define(["config", "auth_storage", "app/app"], function(config, auth_storage, App) {
  "use strict";

  App.ClockService = Ember.Object.extend({
    pulse: Ember.computed.oneWay('_timeStamp').readOnly(),
    tick: function () {
      Ember.run.later(
        this,
        function () {
          var seconds = this.get('_timeStamp')
          if (typeof seconds === 'number') {
            this.set('_timeStamp', +new Date)
          }
        },
        30000)
    }.observes('_timeStamp').on('init'),
    _timeStamp: +new Date,
  }).create();

  Ember.Application.initializer({
    name: 'clockServiceInitializer',
    initialize: function(container, application) {
      container.register('clock:service', App.ClockService, { instantiate: false, singleton: true })
      application.inject('controller', 'clock', 'clock:service')
    }
  })

})
