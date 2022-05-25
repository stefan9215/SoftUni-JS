window.addEventListener('load', solve);

function solve() {
    const model = document.querySelector('#model');
    const year = document.querySelector('#year');
    const description = document.querySelector('#description');
    const price = document.querySelector('#price');
    document.querySelector('#add').addEventListener('click', addHandler);

    const table = document.querySelector('#furniture-list');

    function addHandler(e) {
        e.preventDefault();

        if (model.value == '' || year.value < 0 || year.value == ''
            || description.value == '' || price.value < 0 || price.value == '') {
            return;
        }

        const infoRow = document.createElement('tr');

        const moreInfoRow = document.createElement('tr');

        infoRow.classList.add('info');
        const furnitureTd = document.createElement('td');
        furnitureTd.textContent = model.value;
        const priceTd = document.createElement('td');
        priceTd.textContent = Number(price.value).toFixed(2);
        const buttonsTd = document.createElement('td');
        const moreBtn = document.createElement('button');
        moreBtn.classList.add('moreBtn');
        moreBtn.textContent = 'More Info';
        moreBtn.addEventListener('click', moreInfoHandler.bind(null, moreInfoRow));

        const buyBtn = document.createElement('button');
        buyBtn.classList.add('buyBtn');
        buyBtn.textContent = 'Buy it';
        buyBtn.addEventListener('click', buyHandler.bind(null, infoRow,moreInfoRow));

        buttonsTd.appendChild(moreBtn);
        buttonsTd.appendChild(buyBtn);

        infoRow.appendChild(furnitureTd);
        infoRow.appendChild(priceTd);
        infoRow.appendChild(buttonsTd);

        moreInfoRow.classList.add('hide');
        const yearTd = document.createElement('td');
        yearTd.textContent = `Year: ${year.value}`;

        const descriptionTd = document.createElement('td');
        descriptionTd.setAttribute('colspan', '3');
        descriptionTd.textContent = `Description: ${description.value}`;

        moreInfoRow.appendChild(yearTd);
        moreInfoRow.appendChild(descriptionTd);

        table.appendChild(infoRow);
        table.appendChild(moreInfoRow);

        model.value = '';
        year.value = '';
        description.value = '';
        price.value = '';
    }

    function moreInfoHandler(moreInfoRow, e) {
        let clickedFurniture = e.target;


        if (clickedFurniture.textContent == 'More Info') {
            clickedFurniture.textContent = 'Less Info';
            moreInfoRow.style.display = 'contents';
        } else {
            clickedFurniture.textContent = 'More Info';
            moreInfoRow.style.display = 'none';
        }

    }

    function buyHandler(infoRow,moreInfoRow) {

        let totalPrice = document.querySelector('.total-price');
        let currentPrice = infoRow.children[1];

        totalPrice.textContent = Number(currentPrice.textContent) + Number(totalPrice.textContent);
        totalPrice.textContent = Number(totalPrice.textContent).toFixed(2);
        infoRow.remove();
        moreInfoRow.remove();
    }

}
