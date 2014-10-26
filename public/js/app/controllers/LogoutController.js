define(["config",
        "app/app"], function(config, App) {
  App.LogoutController = Ember.ObjectController.extend({
    init: function() {
      var controller = this

      $.ajax({
        url: config.host + "/logout",
        success: function() {
          controller.transitionToRoute('home')
        }
      })
    }
  })
});
