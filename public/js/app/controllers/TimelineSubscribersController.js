define(["app/app",
        "ember",
        "controllers/ApplicationController"], function(App, Ember) {
  "use strict";

   App.TimelineSubscribersController = App.ApplicationController.extend({
     isEdit: false,

     actions: {
       removeSubscriber: function(username) {
       },

       manage: function() {
         this.set('isEdit', true)
       },

       browse: function() {
         this.set('isEdit', false)
       }
     }
  })
})
