watchTask(['themes'], function () {
  this.watchFiles.include([
    './themes/**/*.scss'
  ]);
});

desc('Compile scss themes.')
task('themes', function () {
  var sass = require('node-sass')
    , fs = require('fs')
    , result
    , files = {
      './themes/fresh/app.scss': './public/css/themes/fresh/app.css',
      './themes/helvetica/app.scss': './public/css/themes/helvetica/app.css',
      './themes/common/select2/4.0.0-rc.2/core.scss': './public/css/common/select2.css',
      './themes/common/bootstrap/bootstrap.3.3.4.scss': './public/css/common/bootstrap.css'
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
