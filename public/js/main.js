(function(root){
  "use strict";

  require(["config"], function(config) {
    requirejs.config(config)

    require(["App"], function(App){
      App.advanceReadiness()
    })
  })
})(this)
