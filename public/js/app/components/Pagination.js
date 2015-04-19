define(["app/app",
        "ember"], function(App, Ember) {
  "use strict";

  App.Pagination = Ember.Mixin.create({
    queryParams: ['offset'],

    limit: 25,
    offset: 0,

    actions: {
      nextPage: function() {
        this.incrementProperty('offset', this.get('limit'))
      },

      prevPage: function() {
        this.decrementProperty('offset', this.get('limit'))
      }
    },

    prevPageDisabled: function() {
      return this.get('offset') === 0 ? 'disabled' : ''
    }.property('offset'),

    prevPageVisible: function() {
      return this.get('prevPageDisabled') !== 'disabled'
    }.property('prevPageDisabled'),

    nextPageVisible: function() {
      return this.get('nextPageDisabled') !== 'disabled'
    }.property('nextPageDisabled'),

    nextPageDisabled: function() {
      var len = this.get('content.posts.length') ||
          this.get('content.content.length')
      return len === 0 || len === undefined ||
        len < this.get('limit') ? 'disabled' : ''
    }.property('content.posts.length', 'content.content.length', 'limit'),

    resetPage: function() {
      this.set('offset', 0)
    },

    pageDidChange: function() {
      this.didRequestRange({ offset: this.get('offset') || 0,
                             limit: this.get('limit')})
    }.observes('offset'),

    firstPage: function() {
      return this.get('offset') == null || this.get('offset') == 0
    }.property('offset')
  })
})
