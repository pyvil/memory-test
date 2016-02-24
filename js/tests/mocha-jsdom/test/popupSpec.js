var jsdom = require('../index'),
    assert = require('assert'),
    should = require('should');

describe('Modal capabilities', function () {
    var modal;
    jsdom()

    before(function () {
        global.$ = global.jQuery = require('jquery');
        global.Helper = require('../../../components/Helper');
        modal = require('../../../components/Modal');
    })

    it('should be a jquery instance', function () {
        ($('body') instanceof jQuery).should.be.equal(true);
    })

    it('should set text', function () {
        var text = 'holly sheet';
        modal.setText(text);
        modal.getText().should.be.equal(text)
    })

    it('should not get a private variables', function () {
        var text = 'text';
        modal.setText(text);
        String(modal.text).should.be.equal('undefined');
    })
})