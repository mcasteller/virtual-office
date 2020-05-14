'use strict';

/**
 * Module dependencies
 */
const mongoose = require( 'mongoose' ),
  path = require( 'path' ),
  Schema = mongoose.Schema;

/**
 * Role Schema
 */
const Role = new Schema( {
  code: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  userEmails: [ String ]
} );

module.exports = mongoose.model( 'Role', Role );
