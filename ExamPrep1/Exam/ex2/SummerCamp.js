class SummerCamp {
    constructor(organizer, location) {
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = {'child': 150, 'student': 300, 'collegian': 500};
        this.listOfParticipants = [];
    }

    registerParticipant(name, condition, money) {
        if (!this.priceForTheCamp.hasOwnProperty(condition)) {
            throw new Error("Unsuccessful registration at the camp.");
        }

        let currentParticipant = this.listOfParticipants.filter(p => p.name == name)[0];

        if (currentParticipant) {
            return `The ${name} is already registered at the camp.`;
        }

        money = Number(money);
        if (money < this.priceForTheCamp[condition]) {
            return `The money is not enough to pay the stay at the camp.`;
        }

        let newParticipant = {
            name,
            condition,
            power: 100,
            wins: 0
        }

        this.listOfParticipants.push(newParticipant);

        return `The ${name} was successfully registered.`;
    }

    unregisterParticipant(name) {
        let currentParticipant = this.listOfParticipants.filter(p => p.name == name)[0];

        if (currentParticipant == undefined) {
            throw new Error(`The ${name} is not registered in the camp.`);
        }

        this.listOfParticipants = this.listOfParticipants.filter(p => p.name != name);

        return `The ${name} removed successfully.`;
    }

    timeToPlay(typeOfGame, participant1, participant2) {
        if (typeOfGame == 'Battleship') {
            let currentParticipant = this.listOfParticipants.filter(p => p.name == participant1)[0];
            if (currentParticipant == undefined) {
                throw new Error(`Invalid entered name/s.`);
            }
            currentParticipant.power += 20;

            return `The ${participant1} successfully completed the game ${typeOfGame}.`;
        } else if (typeOfGame == 'WaterBalloonFights') {
            let [pl1, pl1Condition] = participant1.split('-');
            let [pl2, pl2Condition] = participant2.split('-');

            let player1 = this.listOfParticipants.filter(p => p.name == pl1)[0];
            let player2 = this.listOfParticipants.filter(p => p.name == pl2)[0];

            if (player1 == undefined || player2 == undefined) {
                throw new Error(`Invalid entered name/s.`);
            }

            if (player1.condition != player2.condition) {
                throw new Error('Choose players with equal condition.');
            }

            let player1Power = Number(player1.power);
            let player2Power = Number(player2.power);

            let winner = '';

            if (player1Power > player2Power) {
                winner = player1.name;
                player1.wins += 1;
                return `The ${winner} is winner in the game ${typeOfGame}.`
            } else if (player2Power > player1Power) {
                winner = player2.name;
                player2.wins += 1;
                return `The ${winner} is winner in the game ${typeOfGame}.`
            }
        }
        return `There is no winner.`;
    }

    toString() {
        let result = [];

        result.push(`${this.organizer} will take ${this.listOfParticipants.length} participants on camping to ${this.location}`);

        this.listOfParticipants
            .sort((a,b) => b.wins - a.wins)
            .forEach(p => result.push(`${p.name} - ${p.condition} - ${p.power} - ${p.wins}`))
        return result.join('\n');

    }

}

// const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
// console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
// console.log(summerCamp.timeToPlay("Battleship", "Petar Petarson"));
// console.log(summerCamp.registerParticipant("Sara Dickinson", "child", 200));
// // console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Sara Dickinson"));
// console.log(summerCamp.registerParticipant("Dimitur Kostov", "student", 300));
// console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Dimitur Kostov"));
//
// console.log(summerCamp.toString());

