var jsdom = require('../index'),
    assert = require('assert'),
    should = require('should');

describe('popup', function () {
    var modal;
    jsdom()

    before(function () {
        global.$ = global.jQuery = require('jquery');
        global.Helper = require('../../../components/Helper');
        modal = require('../../../components/Modal');
    })

    it('should add popup html into body tag', function () {
        modal.popup();
        assert.equal(true, $('body').find('div').hasClass('popup'));
    })
})