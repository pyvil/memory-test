var should = require('should')
var helper = require('../../components/Helper')

describe('test', function(){
    it('should return some number', function(){
        helper.toInt('123', false).should.equal(123)
    })
})