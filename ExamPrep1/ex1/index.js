function solve() {
    const addBtn = document.querySelector('.form-control button');
    const inputName = document.querySelector('input[name= "lecture-name"]');
    const inputDate = document.querySelector('input[name="lecture-date"]');
    const selectModule = document.querySelector('select[name="lecture-module"]');
    addBtn.addEventListener('click', addLecture);


    const modulesDiv = document.querySelector('.modules');

    const modules = {};

    function addLecture(e) {
        e.preventDefault();
        if (inputName.value == '' || inputDate.value == '' || selectModule.value == 'Select module') {
            return;
        } else {

            const delBtn = document.createElement('button');
            delBtn.classList.add('red');
            delBtn.textContent = 'Del';
            delBtn.addEventListener('click', delModule);

            const liTag = document.createElement('li');
            liTag.classList.add('flex');

            const h4 = document.createElement('h4');
            let correctData = inputDate.value.replace('-', '/')
                .replace('-', '/').replace('-', '/').replace('T', ' - ');
            h4.textContent = `${inputName.value} - ${correctData}`;


            liTag.appendChild(h4);
            liTag.appendChild(delBtn);

            let divModules;
            let ulTag;
            let h3;
            if (!modules[selectModule.value]) {
                divModules = document.createElement('div');
                divModules.classList.add('module');
                h3 = document.createElement('h3');
                h3.textContent = `${selectModule.value.toUpperCase()}-MODULE`;
                ulTag = document.createElement('ul');
                divModules.appendChild(h3);
                divModules.appendChild(ulTag);

                modules[selectModule.value] = {divModules, ulTag, lis: []};
            } else {
                divModules = modules[selectModule.value].divModules;
                ulTag = modules[selectModule.value].ulTag;
            }

            modules[selectModule.value].lis.push({liTag, date: correctData});

            modules[selectModule.value].lis.sort((a,b) => a.date.localeCompare(b.date));
            modules[selectModule.value].lis.forEach(({liTag}) => ulTag.appendChild(liTag));



            modulesDiv.appendChild(divModules);

            function delModule(e) {
                if (e.target.parentElement.parentElement.childElementCount == 1) {
                    e.target.parentElement.parentElement.parentElement.remove();
                }
                e.target.parentElement.remove();
            }
        }
    }
}