var should = require('should')
var helper = require('../../components/Helper')

describe('test', function(){
    it('should have `number` type', function() {
        (typeof helper.toInt('123', false)).should.equal('number')
    })

    it('should return some number', function(){
        helper.toInt('123', false).should.equal(123)
    })

    it('should return number from string with symbols', function () {
        console.log(helper.toInt('kk12[oikj2', false));
    })

    it('should return default value when null given', function () {
        helper.toInt(null, false).should.equal(false)
    })
})