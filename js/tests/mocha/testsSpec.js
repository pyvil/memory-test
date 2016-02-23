var should = require('should')
var helper = require('../../components/Helper')

describe('Helper.toInt tests', function(){
    it('should have `number` type', function() {
        (typeof helper.toInt('123')).should.equal('number')
    })

    it('should return some number', function(){
        helper.toInt('123').should.equal(123)
    })

    it('should return number from string with symbols', function () {
        helper.toInt('kk12[oikj2').should.equal(122)
    })

    it('should return 0 when null or undefined given', function () {
        helper.toInt(null).should.equal(0)
        helper.toInt(undefined).should.equal(0)
    })

    it('should return 0 when string of symbols given', function () {
        helper.toInt('lorem ipsum dolor').should.equal(0)
    })
})