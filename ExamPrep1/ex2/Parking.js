class Parking {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }

    addCar(carModel, carNumber) {
        if (this.capacity <= this.vehicles.length) {
            throw new Error('Not enough parking space.');
        }

        this.vehicles.push({
            carModel,
            carNumber,
            payed: false
        });

        return `The ${carModel}, with a registration number ${carNumber}, parked.`
    }

    removeCar(carNumber) {
        let car = this.vehicles.find(v => v.carNumber == carNumber);

        if (car == undefined) {
            throw new Error("The car, you're looking for, is not found.");
        }

        if (!car.payed) {
            throw new Error(`${carNumber} needs to pay before leaving the parking lot.`)
        }

        this.vehicles = this.vehicles.filter(c => c.carNumber != carNumber);

        return `${carNumber} left the parking lot.`;
    }

    pay(carNumber) {
        let car = this.vehicles.find(v => v.carNumber == carNumber);

        if (car == undefined) {
            throw new Error(`${carNumber} is not in the parking lot.`);
        }

        if(car.payed) {
            throw new Error(`${carNumber}'s driver has already payed his ticket.`);
        }

        car.payed = true;

        return `${carNumber}'s driver successfully payed for his stay.`
    }

    getStatistics(carNumber){
        if (carNumber == undefined) {
            let output = `The Parking Lot has ${this.capacity - this.vehicles.length} empty spots left.`;
            this.vehicles.sort((a,b) => a.carModel.localeCompare(b.carModel))
                .forEach(car => {
                output += `\n${car.carModel} == ${car.carNumber} - ${car.payed ? 'Has payed' : 'Not payed'}`;
            })
            return output;
        }
        let car = this.vehicles.find(v => v.carNumber == carNumber);

        return `${car.carModel} == ${car.carNumber} - ${car.payed ? 'Has payed' : 'Not payed'}`

    }

}

const parking = new Parking(12);

console.log(parking.addCar("Volvo a600", "TX3691CA"));
console.log(parking.addCar("Volvo t1000", "TX6666CA"));
console.log(parking.getStatistics());
console.log(parking.getStatistics("TX6666CA"));

console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));
