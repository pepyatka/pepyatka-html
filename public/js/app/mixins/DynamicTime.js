define(["app/app",
        "ember",
        "moment"], function(App, Ember, moment) {
  "use strict";

  App.DynamicTime = Ember.Mixin.create({
    pulseBinding: 'clock.pulse',

    createdAgo: function() {
      var model = this.get('model')
      if (model.get('createdAt')) {
        return moment(model.get('createdAt')).fromNowOrNow()
      }
    }.property('pulse'),

    createdAtISO: function() {
      var model = this.get('model')
      if (model.get('createdAt')) {
        return moment(model.get('createdAt')).format()
      }
    }.property('pulse')
  })
})
