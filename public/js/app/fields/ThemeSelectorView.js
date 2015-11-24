define(["app/app"], function(App) {
  "use strict";

  App.ThemeSelectorView = Ember.Select.extend({
    classNames: ['form-control theme-selector'],

    change: function(event) {
      this.get('controller').send('themeSelect', event.target.value);
    }
  })
})
