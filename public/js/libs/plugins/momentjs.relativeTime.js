require(['moment'], function(moment) {
  moment.fn.fromNowOrNow = function (a) {
    if (Math.abs(moment().diff(this)) < 60000) { // 60 seconds
      // before or after now
      return 'just now'
    }

    return this.fromNow(a)
  }
})
