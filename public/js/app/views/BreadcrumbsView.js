define(["app/app",
        "text!templates/breadcrumbsTemplate.handlebars"], function(App, tpl) {
  App.BreadcrumbsView = Ember.View.extend({
    templateName: 'breadcrumbs',
    template: Ember.Handlebars.compile(tpl)
  })
})
