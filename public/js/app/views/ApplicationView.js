define(["app/app",
        "text!templates/applicationTemplate.handlebars",
        "app/helpers/components"], function(App, tpl) {
  App.ApplicationView = Ember.View.extend(App.ShowSpinnerWhileRendering, {
    templateName: 'application',
    template: Ember.Handlebars.compile(tpl),

    isAnonymous: function() {
      return App.properties.get('username') === null ||
        App.properties.get('username') === 'anonymous'
    }.property('App.properties.username')
  });
});
