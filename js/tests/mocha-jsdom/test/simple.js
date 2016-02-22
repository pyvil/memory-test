
// DOM stuff
var jsdom = require('../index')

// test stuff
var assert = require('assert');

describe('simple', function () {
  jsdom()

  it('has document', function () {
    var div = document.createElement('div')
    expect(div.nodeName).eql('DIV')
  })
})