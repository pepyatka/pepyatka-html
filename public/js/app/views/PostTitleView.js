define(["app/app",
        "text!templates/postTitleTemplate.handlebars"], function(App, tpl) {
  App.PostTitleView = Ember.View.extend({
    templateName: 'post-title',
    template: Ember.Handlebars.compile(tpl),

    isFeedPage: function() {
      var timelineName = this.get('parentView.parentView.parentView.templateName')
      return timelineName === 'timeline/index'
    }.property('parentView.parentView.parentView.templateName')
  })
})
