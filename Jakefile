var exec = require('child_process').exec

task('default', ['themes'], function (params) {
});

desc('Compile js files.')
task('compile', function() {
  var proc = exec('node ./node_modules/requirejs/bin/r.js -o build.js')
  proc.on('exit', process.exit)
  proc.stdout.pipe(process.stdout, { end: false })
  proc.stderr.pipe(process.stderr, { end: false })
})

watchTask(['themes'], function () {
  this.watchFiles.include([
    './themes/**/*.scss'
  ])
})

desc('Compile scss themes.')
task('themes', function () {
  var sass = require('node-sass')
    , fs = require('fs')
    , result
    , files = {
      './themes/fresh/app.scss': './public/css/themes/fresh/app.css',
      './themes/helvetica/app.scss': './public/css/themes/helvetica/app.css',
      './themes/common/common.scss': './public/css/common/common.css'
    }

  for (var value in files) {
    result = sass.renderSync({
      file: value,
      outputStyle: 'compressed',
      sourceMap: true
    })

    fs.writeFileSync(files[value], result.css)
    console.log(files[value] + " has been prepared.")
  }
})
