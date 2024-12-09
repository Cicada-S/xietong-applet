import gulp from 'gulp'
import replace from 'gulp-replace'
import pack from './package.json'

gulp.task('copy_resource', () => {
  return gulp.src('./func/*')
    .pipe(gulp.dest('./'))
})

gulp.task('update_version', () => {
  return gulp.src('./func/ctor.js')
    .pipe(replace(/'@VERSION'/, `'${pack.version}'`))
    .pipe(gulp.dest('./'))
})

gulp.task('build', gulp.series('copy_resource', 'update_version'))
