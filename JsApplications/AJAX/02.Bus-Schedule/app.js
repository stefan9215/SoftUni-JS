function solve() {

    const infoDiv = document.querySelector('#info span');
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');
    let data = {
        next: 'depot'
    };

    async function depart() {
        try {
            departBtn.disabled = true;
            const ref = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${data.next}`);
            if (ref.status != 200) {
                throw new Error('Error!');
            }
            data = await ref.json();

            infoDiv.textContent = `Next stop ${data.name}`;

            arriveBtn.disabled = false;
        } catch (err) {
            infoDiv.textContent = err.message;
        }
    }

    function arrive() {
        infoDiv.textContent = `Arriving at ${data.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();