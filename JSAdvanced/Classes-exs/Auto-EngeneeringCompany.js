function solve(arr) {
    const carBrands = new Map();
    for (const input of arr) {
        let [carBrand, carModel,amount] = input.split(' | ');
        amount = Number(amount);
        if(!carBrands.has(carBrand)) {
            carBrands.set(carBrand,new Map());
        }
        let model = carBrands.get(carBrand);
        if(!model.has(carModel)) {
            model.set(carModel,0);
        }
        carBrands.set(carBrand,model.set(carModel,model.get(carModel) + amount));
    }
    [...carBrands].forEach(([key, value]) => {
        output = (`${key}\n`);

        [...value].forEach(([m,a]) => {
            output += `###${m} -> ${a}\n`;
        })
        console.log(output.trim())
    })
}

solve(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']
);