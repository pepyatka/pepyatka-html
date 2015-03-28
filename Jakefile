watchTask(['themes'], function () {
  this.watchFiles.include([
    './themes/**/*.scss'
  ]);
});

desc('Compile scss themes.')
task('themes', function () {
  var sass = require('node-sass')
    , fs = require('fs')
    , inFile = './themes/fresh/app.scss'
    , outFile = './public/css/themes/fresh/app.css'

  var result = sass.renderSync({
    file: inFile,
    outputStyle: 'compressed',
    sourceMap: true
  })

  console.log(outFile + " has been prepared.")
  fs.writeFileSync(outFile, result.css);
})
