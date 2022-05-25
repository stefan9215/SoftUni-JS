class Company {
    constructor() {
        this.departments = new Map();
    }

    addEmployee(name, salary, position, department) {
        if (name && salary  && position && department) {
            if (salary < 0) {
                throw Error('Invalid input!');
            }
            const worker = {
                name,
                salary,
                position
            }
            if (!this.departments.has(department)) {
                this.departments.set(department, []);
            }

            this.departments.get(department).push(worker);
            return `New employee is hired. Name: ${name}. Position: ${position}`;
        } else {
            throw Error('Invalid input!');
        }
    }

    bestDepartment() {
        let bestDepartment = '';
        let bestAvgSalary = 0;
        for (const department of this.departments) {
            let avgSalary = 0;
            for (const departmentElement of department[1]) {
                avgSalary += departmentElement.salary;
            }
            avgSalary = avgSalary / department[1].length;
            if (bestAvgSalary < avgSalary) {
                bestDepartment = department[0];
                bestAvgSalary = avgSalary;
            }
        }
        this.departments.get(bestDepartment).sort((a,b) => {
            return b.salary - a.salary || a.name.localeCompare(b.name);
        })

        let output = '';
            output += `Best Department is: ${bestDepartment}\n`;
            output += `Average salary: ${bestAvgSalary.toFixed(2)}\n`;

        this.departments.get(bestDepartment).forEach((el) => {
            output += `${el.name} ${el.salary} ${el.position}\n`;
        })

        return output.trim();
    }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());
