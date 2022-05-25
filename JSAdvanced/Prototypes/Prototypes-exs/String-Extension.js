(function () {
    String.prototype.ensureStart = function (str) {
        let myStr = this.toString();
        if (!myStr.startsWith(str)) {
            return str + myStr;
        }
        return myStr.toString();
    }

    String.prototype.ensureEnd = function (str) {
        let myStr = this.toString();

        if (!myStr.endsWith(str)) {
            return myStr + str;
        }
        return myStr;
    }

    String.prototype.isEmpty = function () {
        return this.length == 0;
    }

    String.prototype.truncate = function (n) {
        let myStr = this.toString();

        if (n < 4) {
            return '.'.repeat(n);
        }

        if (this.length <= n) {
            return this.toString();
        } else {
            let arr = myStr.split(' ');

            if (arr.length == 1) {
                return myStr.substring(0, n - 3) + '...';
            } else {
                let result = '';

                for (let i = 0; i < arr.length; i++) {
                    if (result.length + arr[i].length <= n - 3) {
                        result += ' ' + arr[i];
                    } else {
                        return result.trim() + '...';
                    }
                }
                return result + '...';
            }
        }
    }

    String.format = function (str, ...params) {
        let result = str;

        for (let i = 0; i < params.length; i++) {
                result = result.replace(`{${i}}`,params[i]);
        }
        return result;
    }
})()

let str = 'my string';
console.log(str = str.ensureStart('my'));
console.log(str = str.ensureStart('hello '));
console.log(str = str.truncate(16));
console.log(str = str.truncate(14));
console.log(str = str.truncate(8));
console.log(str = str.truncate(4));
console.log(str = str.truncate(2));
console.log(str = String.format('The {0} {1} fox',
    'quick', 'brown'));
console.log(str = String.format('jumps {0} {1}',
    'dog'));

