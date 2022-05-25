window.addEventListener('load', solution);

function solution() {
    const [name, email, phoneNumber, address, postalCode] = document.querySelectorAll('#form input');
    const submitBtn = document.querySelector('#submitBTN');

    submitBtn.addEventListener('click', submitHandler);

    const ulPreview = document.querySelector('#infoPreview');
    const editBtn = document.querySelector('#editBTN');
    const continueBtn = document.querySelector('#continueBTN');

    let inputFields = {};

    function submitHandler() {
        if (name.value == '' || email.value == '') {
            return;
        }

        const nameLi = document.createElement('li');
        nameLi.textContent = `Full Name: ${name.value}`;
        const emailLi = document.createElement('li');
        emailLi.textContent = `Email: ${email.value}`;
        const phoneLi = document.createElement('li');
        phoneLi.textContent = `Phone Number: ${phoneNumber.value}`;
        const addressLi = document.createElement('li');
        addressLi.textContent = `Address: ${address.value}`;
        const postalLi = document.createElement('li');
        postalLi.textContent = `Postal Code: ${postalCode.value}`;

        inputFields = {
           name: name.value,
           email: email.value,
           phoneNumber: phoneNumber.value,
           address: address.value,
           postalCode: postalCode.value
        }

        ulPreview.appendChild(nameLi);
        ulPreview.appendChild(emailLi);
        ulPreview.appendChild(phoneLi);
        ulPreview.appendChild(addressLi);
        ulPreview.appendChild(postalLi);

        name.value = '';
        email.value = '';
        phoneNumber.value = '';
        address.value = '';
        postalCode.value = '';

        submitBtn.disabled = true;
        editBtn.disabled = false;
        editBtn.addEventListener('click', editInfo);
        continueBtn.disabled = false;
        continueBtn.addEventListener('click', () => {
            const block = document.querySelector('#block');
            const h3 = document.createElement('h3');
            h3.textContent = 'Thank you for your reservation!';
            block.innerHTML = '';
            block.appendChild(h3);
        })
    }

    function editInfo() {
        submitBtn.disabled = false;
        editBtn.disabled = true;
        continueBtn.disabled = true;
        ulPreview.textContent = '';
        name.value = inputFields.name;
        email.value = inputFields.email
        phoneNumber.value = inputFields.phoneNumber
        address.value = inputFields.address
        postalCode.value = inputFields.postalCode
    }
}
