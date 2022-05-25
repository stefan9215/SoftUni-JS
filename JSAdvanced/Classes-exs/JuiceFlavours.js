function solve(arr) {
    const juiceMap = new Map();
    const resultMap = new Map();
    for (const element of arr) {
        let [flavour, count] = element.split(' => ');
        count = Number(count);
        if (!juiceMap.has(flavour)) {
            juiceMap.set(flavour, 0);
        }
        let totalAmount = juiceMap.get(flavour) + count;

        if (totalAmount >= 1000) {
            if (!resultMap.has(flavour)) {
                resultMap.set(flavour, 0);
            }
            let newBottles = Math.trunc(totalAmount / 1000);
            let totalBottle = resultMap.get(flavour) + newBottles;
            resultMap.set(flavour, totalBottle);
        }

        juiceMap.set(flavour, totalAmount % 1000);
    }

    return [...resultMap]
        .map(([key, value]) => `${key} => ${value}`)
        .join('\n');
}

console.log(solve(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549']
))