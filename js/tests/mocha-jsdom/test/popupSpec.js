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

    it('should set text and background', function () {
        var text = 'text',
            background = '#ddd';

        var instance = modal.setText(text).setBackground(background);
        instance.getText().should.be.equal(text);
        instance.getBackground().should.be.equal(background);
    })

    it('should return defaults when nothing given', function() {
        modal.getText().should.not.equal(null);
        modal.getBackground().should.not.equal(null);

        modal.getText().should.not.equal(undefined);
        modal.getBackground().should.not.equal(undefined);
    })

    it('should not get a private variables', function () {
        var text = 'text';
        modal.setText(text);
        String(modal.text).should.be.equal('undefined');
    })
})