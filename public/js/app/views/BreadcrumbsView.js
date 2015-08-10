define(["app/app",
        "text!templates/breadcrumbsTemplate.handlebars"], function(App, tpl) {
  App.BreadcrumbsViewComponent = Ember.Component.extend({
    templateName: 'breadcrumbs',
    template: Ember.Handlebars.compile(tpl)
  })
})
