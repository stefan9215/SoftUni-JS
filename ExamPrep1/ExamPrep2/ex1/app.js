function solution() {
    const inputName = document.querySelector('.card div input');
    const addBtn = document.querySelector('.card div button');

    addBtn.addEventListener('click', addGift);

    const [giftList, sentGifts, discardGifts] = document.querySelectorAll('.card ul');


    function addGift() {
        if (!inputName.value) {
            return;
        }
        const li = document.createElement('li');
        li.classList.add('gift');
        li.textContent = inputName.value;
        const sendBtn = document.createElement('button');
        sendBtn.id = 'sendButton';
        sendBtn.textContent = 'Send';
        sendBtn.addEventListener('click', sendGift);

        const discardBtn = document.createElement('button');
        discardBtn.id = 'discardButton';
        discardBtn.textContent = 'Discard';
        discardBtn.addEventListener('click', discardGift);

        li.appendChild(sendBtn);
        li.appendChild(discardBtn);
        giftList.appendChild(li);
        sort();
        inputName.value = '';
    }

    function sendGift(e) {
        const liElement = e.target.parentElement;

        liElement.lastElementChild.remove();
        liElement.lastElementChild.remove();
        sentGifts.appendChild(liElement);
    }

    function discardGift(e) {
        const liElement = e.target.parentElement;
        liElement.lastElementChild.remove();
        liElement.lastElementChild.remove();
        discardGifts.appendChild(liElement);
    }

    function sort() {
        return Array.from(giftList.children)
            .sort((a, b) => a.textContent.localeCompare(b.textContent))
            .forEach((g) => giftList.appendChild(g));
    }
}