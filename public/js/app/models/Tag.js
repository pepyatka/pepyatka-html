define(["config",
        "app/app"], function(config, App) {
  App.Tag = Ember.Object.extend({
    content: {}
  })
  App.Tag.reopenClass({
    resourceUrl: config.host + '/v1/tags',

    findAll: function() {
      var tags = Ember.ArrayProxy.create({content: []});

      $.ajax({
        url: this.resourceUrl,
        dataType: 'jsonp',
        context: this,
        type: 'get',
        success: function(response) {
          response.forEach(function(attrs) {
            // TODO: return attrs as an object
            var tag = App.Tag.create({name: encodeURIComponent(attrs)})
            tags.addObject(tag)
          })
        },
        error: App.helpers.handleAjaxError
      })

      return tags
    }
  })
});
