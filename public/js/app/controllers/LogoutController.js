define(["config",
        "app/app"], function(config, App) {
  App.LogoutController = Ember.ObjectController.extend({
    actions: {
      logout: function() {
        window.localStorage.setItem('token', '');

        window.location = "/"
      }
    }
  })
});
