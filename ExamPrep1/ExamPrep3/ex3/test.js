const numberOperations = require('./03. Number Operations_Resources');
const {assert} = require('chai');

describe('Test numberOperations methods', () => {
    describe('Test powNumber', () => {
        it('should return power of positive number', () => {
            assert.equal(numberOperations.powNumber(5),25);
        });

        it('should return power of negative number', () => {
            assert.equal(numberOperations.powNumber(-5), 25);
        });

        it('should return 0', () => {
            assert.equal(numberOperations.powNumber(0),0);
        });
    });

    describe('Test numberChecker', () => {
        it('should throw error with non-number input', () => {
            assert.throw(() => numberOperations.numberChecker('a'),'The input is not a number!');
        });

        it('should throw error with non-number input', () => {
            assert.throw(() => numberOperations.numberChecker('[]'),'The input is not a number!');
        });

        it('should return input is low than 100 with input 1', () => {
            assert.equal(numberOperations.numberChecker(1),'The number is lower than 100!');
        });

        it('should return input is low than 100 with input 99', () => {
            assert.equal(numberOperations.numberChecker(99),'The number is lower than 100!');
        });

        it('should return input is low than 100 with input string number', () => {
            assert.equal(numberOperations.numberChecker('1'),'The number is lower than 100!');
        });

        it('should return input is greater or equal to 100 with input 100', () => {
           assert.equal(numberOperations.numberChecker(100),'The number is greater or equal to 100!');
        });
    });

    describe('Test sumArrays method', () => {
        it('should return correct arr', ()  => {
            let arr1 = [1,2,3,4,5];
            let arr2 = [1,2,3,4];

            assert.deepEqual(numberOperations.sumArrays(arr1, arr2),[2,4,6,8,5]);
        })
    })
})