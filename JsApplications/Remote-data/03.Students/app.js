const studentsTable = document.querySelector('#results tbody');
const form = document.querySelector('#form');
    form.addEventListener('submit',addStudent);

async function addStudent(e) {
    e.preventDefault();
    const url = 'http://localhost:3030/jsonstore/collections/students';

    const formData = new FormData(form);

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');


    const student = {
        firstName,
        lastName,
        facultyNumber,
        grade
    };

    const res = await fetch(url,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    getStudents();
}

async function getStudents() {
    studentsTable.replaceChildren();

    const url = 'http://localhost:3030/jsonstore/collections/students';
    const res = await fetch(url);
    const data = await res.json();

    Object.values(data).forEach(s => {
        studentsTable.appendChild(createRow(s));
    });

}

function createRow(students) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${students.firstName}</td>
<td>${students.lastName}</td>
<td>${students.facultyNumber}</td>
<td>${students.grade}</td>`;

    return row;
}

getStudents()