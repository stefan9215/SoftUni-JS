const library = require('./library');
const {assert} = require('chai');

describe('Test library methods', function () {
    describe('test calcPriOfBook', function () {
        it('should throw with non string input', function () {
            assert.throw(() => library.calcPriceOfBook(1, 1990));
        });
        it('should throw with non string input', function () {
            assert.throw(() => library.calcPriceOfBook([], 1990));
        });
        it('should throw with non string input', function () {
            assert.throw(() => library.calcPriceOfBook({}, 1990));
        });
        it('should throw with non string input', function () {
            assert.throw(() => library.calcPriceOfBook(null, 1990));
        });
        it('should throw with non string input', function () {
            assert.throw(() => library.calcPriceOfBook(undefined,1990));
        });

        it('should throw with non number input', function () {
            assert.throw(() => library.calcPriceOfBook('a','a'));
        });
        it('should throw with non number input', function () {
            assert.throw(() => library.calcPriceOfBook('a',null));
        });
        it('should throw with non number input', function () {
            assert.throw(() => library.calcPriceOfBook('a',undefined));
        });
        it('should throw with non number input', function () {
            assert.throw(() => library.calcPriceOfBook('a', {}));
        });
        it('should throw with non number input', function () {
            assert.throw(() => library.calcPriceOfBook('a','1'));
        });
        //Positive cases

        it('should return discounted price for older than 1981 book', function () {
            assert.equal(library.calcPriceOfBook('Book',1980),`Price of Book is 10.00`);
        });

        it('should return discounted price for older than 1981 book', function () {
            assert.equal(library.calcPriceOfBook('Book',1),`Price of Book is 10.00`);
        });

        it('should return  price for younger than 1980 book', function () {
            assert.equal(library.calcPriceOfBook('Book',1981),`Price of Book is 20.00`);
        });

        it('should return  price for younger than 1980 book', function () {
            assert.equal(library.calcPriceOfBook('Book',2000),`Price of Book is 20.00`);
        });
    });

    describe('test findBook', function () {
        it('should throw Error with empty input', function () {
            assert.throw(() => library.findBook([],"book"));
        });

        it('should return the founded book', function () {
            assert.equal(library.findBook(['Book','Book1'],"Book"),'We found the book you want.')
        });

        it('should return not founded book', function () {
            assert.equal(library.findBook(['Book','Book1'],"Invalid"),"The book you are looking for is not here!");
        });

        it('should return not founded book', function () {
            assert.equal(library.findBook(['Book','Book1'],1),"The book you are looking for is not here!");
        });
    });

    describe('test arrangeTheBooks', function () {
        it('should throw Error with invalid input', function () {
            assert.throw(() => library.arrangeTheBooks(-1));
            assert.throw(() => library.arrangeTheBooks(-100));
            assert.throw(() => library.arrangeTheBooks(null));
            assert.throw(() => library.arrangeTheBooks(undefined));
            assert.throw(() => library.arrangeTheBooks({}));
            assert.throw(() => library.arrangeTheBooks('1'));
        });

        it('should return great job with valid number of books', function () {
            assert.equal(library.arrangeTheBooks(40),'Great job, the books are arranged.');
            assert.equal(library.arrangeTheBooks(1),'Great job, the books are arranged.');
            assert.equal(library.arrangeTheBooks(0),'Great job, the books are arranged.');
            assert.equal(library.arrangeTheBooks(35),'Great job, the books are arranged.');
        });

        it('should return not enough space with invalid number of books', function () {
            assert.equal(library.arrangeTheBooks(41),"Insufficient space, more shelves need to be purchased.");
            assert.equal(library.arrangeTheBooks(50),"Insufficient space, more shelves need to be purchased.");
            assert.equal(library.arrangeTheBooks(100),"Insufficient space, more shelves need to be purchased.");
            assert.equal(library.arrangeTheBooks(5000),"Insufficient space, more shelves need to be purchased.");
        });
    });
});