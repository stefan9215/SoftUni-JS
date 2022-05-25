function solution() {

class Figure {
    constructor(unit = 'cm') {
        this.unit = unit;
    }

    get area() {
        let result = 1;
        if (this.unit == 'm') {
            return result / 100;
        } else if (this.unit == 'mm') {
            return result * 10;
        }

        return result;
    }

    changeUnits(unit) {
        this.unit = unit;
    }

    toString() {
        return `Figures units: ${this.unit}`;
    }
}

class Circle extends Figure {
    constructor(radius, unit = 'cm') {
        super(unit = 'cm');
        this.radius = radius;
    }

    get area() {
        return (super.area * this.radius) ** 2 * Math.PI;
    }

    toString() {
        return super.toString() + ` Area: ${this.area} - radius: ${this.radius * super.area}`;
    }

}

class Rectangle extends Figure {
    constructor(width, height, unit = 'cm') {
        super(unit);
        this.width = width;
        this.height = height;
    }

    get area() {
        return (this.width * super.area) * (this.height * super.area);
    }

    toString() {
        return super.toString() + ` Area: ${this.area} - width: ${this.width * super.area}, height: ${this.height * super.area}`;
    }

}


    return {Figure, Circle, Rectangle}
}

let c = new Circle(5);
console.log(c.area); // 78.53981633974483
console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

c.changeUnits('mm');
console.log(c.area); // 7853.981633974483
console.log(c.toString())

let r = new Rectangle(3, 4, 'mm');
console.log(r.area); // 1200
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

r.changeUnits('cm');
console.log(r.area); // 12
console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4


