const cinema = require('./cinema');
const {assert} = require('chai');

describe('Test cinema methods', function () {
    describe('Test showMovies method', function () {
        it('should return no movies with no input', function () {
            assert.equal(cinema.showMovies([]),'There are currently no movies to show.');
        });

        it('should return list of movies', function () {
            assert.equal(cinema.showMovies(['King Kong', 'The Tomorrow War', 'Joker']),'King Kong, The Tomorrow War, Joker');
        });
    });

    describe('Test ticket price method', function () {
        it('should throw with input different than the required', function () {
            assert.throw(() => cinema.ticketPrice('Invalid'));
        });

        it('should correct price with valid input', function () {
            assert.equal(cinema.ticketPrice('Premiere'),12.00);
        });

        it('should correct price with valid input', function () {
            assert.equal(cinema.ticketPrice('Normal'),7.50);
        });

        it('should correct price with valid input', function () {
            assert.equal(cinema.ticketPrice('Discount'),5.50);
        });
    });

    describe('Test swapSeats method', function () {
        it('should return unsuccessful swap with floating point input', function () {
            assert.equal(cinema.swapSeatsInHall(1.2,1),"Unsuccessful change of seats in the hall.");
        });

        it('should return unsuccessful swap with floating point input', function () {
            assert.equal(cinema.swapSeatsInHall(1,1.1),"Unsuccessful change of seats in the hall.");
        });

        it('should return unsuccessful swap with negative  input', function () {
            assert.equal(cinema.swapSeatsInHall(-1,1),"Unsuccessful change of seats in the hall.");
        });

        it('should return unsuccessful swap with bigger than 20 input', function () {
            assert.equal(cinema.swapSeatsInHall(21,1),"Unsuccessful change of seats in the hall.");
        });


        it('should return unsuccessful swap with negative input', function () {
            assert.equal(cinema.swapSeatsInHall(1,-1),"Unsuccessful change of seats in the hall.");
        });

        it('should return unsuccessful swap with existing value', function () {
            assert.equal(cinema.swapSeatsInHall(1),"Unsuccessful change of seats in the hall.");
        });


        it('should return unsuccessful swap with bigger than 20 input', function () {
            assert.equal(cinema.swapSeatsInHall(1,21),"Unsuccessful change of seats in the hall.");
        });

        it('should return unsuccessful swap with zero input', function () {
            assert.equal(cinema.swapSeatsInHall(0,2),"Unsuccessful change of seats in the hall.");
        });

        it('should return unsuccessful swap with equal seats', function () {
            assert.equal(cinema.swapSeatsInHall(1,1),"Unsuccessful change of seats in the hall.");
        });

        it('should return unsuccessful swap strings', function () {
            assert.equal(cinema.swapSeatsInHall('a',1),"Unsuccessful change of seats in the hall.");
        });

        it('should return unsuccessful swap strings', function () {
            assert.strictEqual(cinema.swapSeatsInHall(2, "Premiere"), "Unsuccessful change of seats in the hall.")
            assert.strictEqual(cinema.swapSeatsInHall(2, {}), "Unsuccessful change of seats in the hall.")
            assert.strictEqual(cinema.swapSeatsInHall(2, []), "Unsuccessful change of seats in the hall.")
            assert.strictEqual(cinema.swapSeatsInHall(2, true), "Unsuccessful change of seats in the hall.")
            assert.strictEqual(cinema.swapSeatsInHall(3, 0), "Unsuccessful change of seats in the hall.")
            assert.strictEqual(cinema.swapSeatsInHall(4, 21), "Unsuccessful change of seats in the hall.")
            assert.strictEqual(cinema.swapSeatsInHall(5, -1), "Unsuccessful change of seats in the hall.")
            assert.equal(cinema.swapSeatsInHall(1,'1'),"Unsuccessful change of seats in the hall.");
        });

        it('should return success swap with correct input', function () {
            assert.equal(cinema.swapSeatsInHall(1,2),"Successful change of seats in the hall.");
        });

        it('should return success swap with correct input', function () {
            assert.equal(cinema.swapSeatsInHall(1,20),"Successful change of seats in the hall.");
        });
    });
});