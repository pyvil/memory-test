var should = require('should')
var helper = require('../../components/Helper')

describe('Helper tests', function(){
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

    it('should format string with parameters passes next when :string passed', function () {
        var replacement = {':string1' : 'dolor', ':string2' : 'mec'},
            text = 'Lorem ipsum :string1 amet :string2',
            formatted = 'Lorem ipsum dolor amet mec';

        helper.format(text, replacement).should.be.equal(formatted)
    })

    it('should shuffle array', function () {
        var array = [1, 2, 3, 4, 5];
        helper.shuffle(array).should.not.be.equal(array);
    })

    it('should parse JSON files', function () {
        var file = 'data/data.json';
        String(helper.parseJSON(file)).should.not.be.equal('null');
        String(helper.parseJSON(file)).should.not.be.equal('undefined');
        (typeof helper.parseJSON(file)).should.be.equal('array')
    })
})