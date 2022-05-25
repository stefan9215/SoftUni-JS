const PaymentPackage = require('./PaymentPackage');

const {expect} = require('chai');

describe('Payment Package tests', () => {
    it('should be instantiate with two parameters', () => {
        let payment = new PaymentPackage('pesho',1);
        expect(payment.name).to.equal('pesho');
        expect(payment.value).to.equal(1);
    })

    it('should throw error when created with one param', () => {
        expect(new PaymentPackage('pesho',-1)).to.throw()
    })
})