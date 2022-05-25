async function getInfo() {
    const busID = document.querySelector('#stopId');
    const busStop = document.querySelector('#stopName');
    const buses = document.querySelector('#buses');
    try {
        if (busID) {
            throw new Error('Error!');
        }
        busStop.textContent = 'Loading...';
        buses.replaceChildren();
        const ref = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${busID.value}`);
        if (ref.status != 200) {
            throw new Error('Error!');
        }
        const data = await ref.json();

        busStop.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            const li = document.createElement('li');
            li.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;

            buses.appendChild(li);
        });
    } catch (error) {
        busStop.textContent = error.message;
    }
}