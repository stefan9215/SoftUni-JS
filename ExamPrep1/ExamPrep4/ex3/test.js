const testNumbers = require('./testNumbers');
const {assert} = require('chai');

describe('Test testNumbers methods', () => {
    describe('Test sumNumbers method', () => {
        it('should return undefined with non number first element', () => {
            assert.isUndefined(testNumbers.sumNumbers('1',1));
        });

        it('should return undefined with non number second element', () => {
            assert.isUndefined(testNumbers.sumNumbers(1, '1'));
        });

        it('should return undefined with non number first element', () => {
            assert.isUndefined(testNumbers.sumNumbers([],1));
        });

        it('should return undefined with non number second element', () => {
            assert.isUndefined(testNumbers.sumNumbers(1,[]));
        });

        it('should return the sum of two integer numbers', () => {
            assert.equal(testNumbers.sumNumbers(1,1),2.00);
        });

        it('should return the sum of two decimal numbers', () => {
            assert.equal(testNumbers.sumNumbers(1.5,3.5),5.00);
        });

        it('should return the sum of two negative numbers', () => {
            assert.equal(testNumbers.sumNumbers(-1,1),0.00);
        });

        it('should return the sum of two integer numbers', () => {
            assert.equal(testNumbers.sumNumbers(-1,-1),-2.00);
        });
    });

    describe('Test numberChecker', () => {
        it('should return input not a number with string', () => {
            assert.throw(() => testNumbers.numberChecker('a'),`The input is not a number!`);
        });

        it('should return input not a number with array', () => {
            assert.throw(() => testNumbers.numberChecker(['a']),`The input is not a number!`);
        });

        it('should return even with even number', () => {
            assert.equal(testNumbers.numberChecker(2),'The number is even!');
        });

        it('should return even with even string number', () => {
            assert.equal(testNumbers.numberChecker('2'),'The number is even!');
        });

        it('should return even with empty array', () => {
            assert.equal(testNumbers.numberChecker([]),'The number is even!');
        });

        it('should return odd with odd number', () => {
            assert.equal(testNumbers.numberChecker(1),'The number is odd!');
        });

        it('should return odd with odd string number', () => {
            assert.equal(testNumbers.numberChecker(1),'The number is odd!');
        });
    });

    describe('Test averageSumArray', function () {
        it('should return correct result', () => {
            let arr = [1,2,3,4,5];
            assert.equal(testNumbers.averageSumArray(arr),3);
        })
    });
});