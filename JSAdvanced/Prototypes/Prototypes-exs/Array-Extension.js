(function () {
    Array.prototype.last = function () {
        return this[this.length - 1];
    }

    Array.prototype.skip = function (n) {
        let arr = [];

        for (let i = n; i < this.length; i++) {
            arr.push(this[i]);
        }
        return arr;
    }

    Array.prototype.take = function (n) {
        let arr = [];

        for (let i = 0; i < n; i++) {
            arr.push(this[i]);
        }

        return arr;
    }

    Array.prototype.sum = function () {
        return this.reduce((acc, p) => {
            acc += p;
            return acc;
        }, 0)
    }

    Array.prototype.average = function () {
        return this.reduce((acc, p) => {
            acc += p / this.length;
            return acc;
        }, 0)
    }
})()

let arr = [1, 2, 3];


console.log(arr.average());