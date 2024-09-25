'use strict'

const chai = global.chai = require('chai')
global.should = chai.should()
global.expect = chai.expect

const sinonChai = require('sinon-chai')
chai.use(sinonChai)

global.sinon = require('sinon')
