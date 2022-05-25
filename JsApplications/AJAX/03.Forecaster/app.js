function attachEvents() {
    document.querySelector('#submit').addEventListener('click', onSubmit);
    const locationInput = document.querySelector('#location');
    const div = document.querySelector('#forecast');

    async function onSubmit() {

        try {
            div.style.display = 'block';

            const res = await fetch(`http://localhost:3030/jsonstore/forecaster/locations`);

            if (res.status != 200) {
                throw new Error('Error');
            }
            const data = await res.json();

            const loc = data.find(i => i.name == locationInput.value);
            if (loc == undefined) {
                throw new Error('Error');
            }

            await getTodayInfo(loc.code);
            await get3DayInfo(loc.code);
        } catch (err) {
            div.textContent = err.message;
        }

    }

    async function getTodayInfo(code) {
        try {
            const res = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`);
            if (res.status != 200) {
                throw new Error('Error');
            }
            const data = await res.json();
            createTodayInfo(data);

        } catch (err) {
            div.textContent = err.message;
        }
    }

    async function get3DayInfo(code) {

        try {
            const res = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`);
            if (res.status != 200) {
                throw new Error('Error');
            }
            const data = await res.json();
            create3DayInfo(data);
        } catch (err) {
            div.textContent = err.message;
        }
    }

    function create3DayInfo(data) {
        const upcoming = document.querySelector('#upcoming');

        const foreCastDiv = document.createElement('div');
        foreCastDiv.classList.add('forecasts-info');

        data.forecast.forEach(f => {
            const upcomingSpan = document.createElement('span');
            upcomingSpan.classList.add('upcoming');
            const symbolSpan = document.createElement('span');
            symbolSpan.classList.add('symbol');
            const degreesSpan = document.createElement('span');
            degreesSpan.classList.add('forecast-data');
            const weatherSpan = document.createElement('span');
            weatherSpan.classList.add('forecast-data');

            let symbol = '';
            switch (f.condition) {
                case 'Sunny' :
                    symbol = '&#x2600';
                    break;
                case 'Partly sunny' :
                    symbol = '&#x26C5';
                    break;
                case 'Overcast' :
                    symbol = '&#x2601';
                    break;
                case 'Rain' :
                    symbol = '&#x2614';
                    break;
            }

            symbolSpan.innerHTML = symbol;
            degreesSpan.innerHTML = `${f.low}&#176/${f.high}&#176`;
            weatherSpan.textContent = f.condition;

            upcomingSpan.appendChild(symbolSpan);
            upcomingSpan.appendChild(degreesSpan);
            upcomingSpan.appendChild(weatherSpan);

            foreCastDiv.appendChild(upcomingSpan);

        });
        upcoming.appendChild(foreCastDiv);
    }

    function createTodayInfo(data) {
        let symbol = '';
        switch (data.forecast.condition) {
            case 'Sunny' :
                symbol = '&#x2600';
                break;
            case 'Partly sunny' :
                symbol = '&#x26C5';
                break;
            case 'Overcast' :
                symbol = '&#x2601';
                break;
            case 'Rain' :
                symbol = '&#x2614';
                break;
        }

        const current = document.querySelector('#current');


        const foreCastDiv = document.createElement('div');
        foreCastDiv.classList.add('forecasts')

        const symbolSpan = document.createElement('span');
        symbolSpan.classList.add('condition');
        symbolSpan.classList.add('symbol');
        symbolSpan.innerHTML = symbol;

        const conditionSpan = document.createElement('span');
        conditionSpan.classList.add('condition');

        const citySpan = document.createElement('span');
        citySpan.classList.add('forecast-data');
        citySpan.textContent = data.name;

        const degreesSpan = document.createElement('span');
        degreesSpan.classList.add('forecast-data');
        degreesSpan.innerHTML = `${data.forecast.low}&#176/${data.forecast.high}&#176`

        const weatherSpan = document.createElement('span');
        weatherSpan.classList.add('forecast-data');
        weatherSpan.textContent = data.forecast.condition;

        conditionSpan.appendChild(citySpan);
        conditionSpan.appendChild(degreesSpan);
        conditionSpan.appendChild(weatherSpan);

        foreCastDiv.appendChild(symbolSpan);
        foreCastDiv.appendChild(conditionSpan);

        current.appendChild(foreCastDiv);
    }

}

attachEvents();