var jsdom = require('../index'),
    assert = require('assert'),
    should = require('should');

describe('test jquery capabilities', function () {
    var modal;
    jsdom()

    before(function () {
        global.$ = global.jQuery = require('jquery');
        global.Helper = require('../../../components/Helper');
        modal = require('../../../components/Modal');
    })

    it('should be a jquery instance', function () {
        ($('body') instanceof jQuery).should.equal(true);
    })

    it('should add popup html into body tag', function () {

    })
})