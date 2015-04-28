define(["app/app", "ember"], function(App, Ember) {
  Ember.Handlebars.registerBoundHelper('prettifyText', function(content) {
    var text = $('<span/>').text(content)

    // wrap anchor tags around links in post text
    text.anchorTextUrls()

    // please read
    // https://github.com/kswedberg/jquery-expander/issues/24
    // text.expander({
    //   slicePoint: 350,
    //   expandPrefix: '&hellip; ',
    //   preserveWords: true,
    //   expandText: 'more&hellip;',
    //   userCollapseText: '',
    //   collapseTimer: 0,
    //   expandEffect: 'fadeIn',
    //   collapseEffect: 'fadeOut'
    // })

    return new Ember.Handlebars.SafeString(text.html())
  })

  Ember.Handlebars.registerBoundHelper('ifpositive', function(property, options) {
    var context = (options.contexts && options.contexts[0]) || this
    var val = Ember.get(context, property)
    if (val > 0)
      return options.fn(this)
    return options.inverse(this)
  })
})
