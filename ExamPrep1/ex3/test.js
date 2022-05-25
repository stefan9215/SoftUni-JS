const pizzUni = require('./pizza');

const {expect, assert} = require('chai');

describe('PizzUni Tests', () => {
    describe('makeAnOrder tests', () => {
        it('should throw error if no pizza is ordered', () => {
            expect(() => pizzUni.makeAnOrder()).to.throw();
        });

        it('should throw error if no pizza is ordered', () => {
            let obj = {
                orderedDrink: 'cola'
            };
            expect(() => pizzUni.makeAnOrder(obj)).to.throw();
        });

        it('should return string with ordered pizza', () => {
            let obj = {
                orderedPizza: 'Margarita'
            };
            assert.equal(pizzUni.makeAnOrder(obj), `You just ordered ${obj.orderedPizza}`)
        });

        it('should return string with ordered pizza and drink', () => {
            let obj = {
                orderedPizza: 'pizza',
                orderedDrink: 'cola'
            }
            assert.equal(pizzUni.makeAnOrder(obj), `You just ordered ${obj.orderedPizza} and ${obj.orderedDrink}.`)
        })
    })

    describe('Test getRemainingWork', () => {
        it('should return preparing pizzas', () => {
            let arr = [
                {pizzaName: 'pizza', status: 'preparing'},
                {pizzaName: 'pizza1', status: 'preparing'},
                {pizzaName: 'pizza2', status: 'preparing'}
            ];
            assert.equal(pizzUni.getRemainingWork(arr), `The following pizzas are still preparing: pizza, pizza1, pizza2.`)
        });

        it('should return preparing pizzas', () => {
            let arr = [
                {pizzaName: 'pizza', status: 'preparing'},
                {pizzaName: 'pizza1', status: 'ready'},
                {pizzaName: 'pizza2', status: 'preparing'}
            ];
            assert.equal(pizzUni.getRemainingWork(arr), `The following pizzas are still preparing: pizza, pizza2.`)
        });

        it('should return all ready pizzas', () => {
            let arr = [
                {pizzaName: 'pizza', status: 'ready'},
                {pizzaName: 'pizza1', status: 'ready'},
                {pizzaName: 'pizza2', status: 'ready'}
            ];
            assert.equal(pizzUni.getRemainingWork(arr), 'All orders are complete!');
        })

        it('should return all with empty arr pizzas', () => {

            assert.equal(pizzUni.getRemainingWork([]), 'All orders are complete!')
        });
    });

    describe('Test orderType', () => {
        it('should return totalSum with with Delivery order type', () => {
            assert.equal(pizzUni.orderType(100,'Delivery'),100);
        });

        it('should return totalSum with discount with Carry Out order type', () => {
            assert.equal(pizzUni.orderType(100,'Carry Out'),90);
        });
    })
});