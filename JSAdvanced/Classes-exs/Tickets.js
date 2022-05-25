function solve(arr, criteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    const outputArr = [];
    for (const element of arr) {
        let [destination, price, status] = element.split('|');
        price = Number(price);
        outputArr.push(new Ticket(destination, price, status));
    }

    if (criteria == 'price') {
        outputArr.sort((a, b) => a[criteria] - b[criteria]);
    }else {
        outputArr.sort((a, b) => a[criteria].localeCompare(b[criteria]));
    }

    return outputArr;
}

console.log(solve(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'status'

));
