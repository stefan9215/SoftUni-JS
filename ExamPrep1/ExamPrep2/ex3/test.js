const dealership = require('./dealership');
const {assert} = require('chai');

describe('Test Dealership', () => {
    describe('Test newCarCost', () => {
        it('should return discounted price when returning old car', () => {
            assert.equal(dealership.newCarCost('Audi A4 B8',35000), 20000);
        });

        it('should return new car price if no car has been returned', () => {
           assert.equal(dealership.newCarCost('BMW m3',100000),100000);
        });

        it('should return new car price if empty string is passed', () => {
            assert.equal(dealership.newCarCost('',100000),100000);
        });
    });

    describe('Test carEquipment', () => {
       it('should return selected extras', () => {
           let extras = ['heated seats','sunroof'];
           let index = [0];
           assert.deepEqual(dealership.carEquipment(extras,index),['heated seats']);
       });

        it('should return empty array', () => {
            let extras = ['heated seats','sunroof'];
            let index = [];
            assert.deepEqual(dealership.carEquipment(extras,index),[]);
        });
    });

    describe('Test euroCategory', () => {
        it('should return low category with category below 4', () => {
            assert.equal(dealership.euroCategory(3),'Your euro category is low, so there is no discount from the final price!');
        });

        it('should return discounted price for category above 3',() => {
            assert.equal(dealership.euroCategory(4),`We have added 5% discount to the final price: 14250.`)
        })
    });
})