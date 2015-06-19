"use strict"

define({
  getStoredToken: function () {
    return window.localStorage.getItem('authToken')
  },

  storeToken: function(token) {
    window.localStorage.setItem('authToken', token)
  }
})
