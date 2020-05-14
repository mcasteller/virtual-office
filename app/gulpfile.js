const { series } = require( 'gulp' );
const nodemon = require( 'gulp-nodemon' );

const nodemonIgnore =  [
  'node_modules/',
  'assets/',
  'crons/',
  'test/',
  'gulp/',
  'Readme.md',
  'gulpfile.js'
];

const express = ( cb ) => {
  let started = false;
  nodemon( {
    script: './bin/www',
    ext: 'js',
    nodeArgs: [
      // '--debug',
      // '--inspect=0.0.0.0:9229'
    ],
    ignore: nodemonIgnore
  } )
    .on( 'start', () => {
      if ( !started ) {
     		// to avoid nodemon being started multiple times
        started = true;
        cb();
      }
    } )
};

exports.nodemon = series( express )
