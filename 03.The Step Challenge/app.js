const baseUrl = `http://localhost:3030/jsonstore/records`;

const loadButton = document.getElementById('load-records');
const addButton = document.getElementById('add-record');
const editButton = document.getElementById('edit-record');
const recordList = document.getElementById('list');
const formElement = document.querySelector('#form form');

const nameInput = document.getElementById('p-name');
const stepsInput = document.getElementById('steps');
const caloriesInput = document.getElementById('calories');

// Load records
loadButton.addEventListener('click', loadRecords);
addButton.addEventListener('click', addRecord);
editButton.addEventListener('click', editRecord)

async function addRecord() {
    // Get input information
    const name = nameInput.value;
    const steps = stepsInput.value;
    const calories = caloriesInput.value;

    // Clear input fields FIRST
    clearInputs();

    // Create post request
    await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, steps, calories }),
    });

    // Fetch all records
    await loadRecords();
}

async function editRecord() {
    // Get id from the attribute
    const recordId = formElement.getAttribute('data-record-id');

    // Get info from inputs
    const name = nameInput.value;
    const steps = stepsInput.value;
    const calories = caloriesInput.value;

    // Clear inputs
    clearInputs();

    // Send put request
    await fetch(`${baseUrl}/${recordId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, steps, calories, _id: recordId}),
    });

    // Fetch all records
    await loadRecords();

    // Deactivate edit button
    editButton.setAttribute('disabled', 'disabled');

    // Activate add button
    addButton.removeAttribute('disabled');
}

async function loadRecords() {
    // Clear records list
    recordList.innerHTML = '';

    // Get request
    const response = await fetch(baseUrl);
    const result = await response.json();
    const records = Object.values(result);
    
    // Create record element
    const recordElements = records.map(record => createRecordElement(record.name, record.steps, record.calories, record._id));

    // Add to record list
    recordList.append(...recordElements);

    // Deactivate edit button
    editButton.setAttribute('disabled', 'disabled');
}

function createRecordElement(name, steps, calories, recordId) {
    const namePElement = document.createElement('p');
    namePElement .textContent = name;
    const stepsPElement = document.createElement('p');
    stepsPElement.textContent = steps;
    const caloriesPElement = document.createElement('p');
    caloriesPElement.textContent = calories;

    const divContentElement = document.createElement('div'); // info
    divContentElement.classList.add('info');
    divContentElement.appendChild(namePElement);
    divContentElement.appendChild(stepsPElement);
    divContentElement.appendChild(caloriesPElement);

    const changeButton = document.createElement('button');
    changeButton.classList.add('change-btn');
    changeButton.textContent = "Change";
    changeButton.addEventListener('click', () => {
        // Populate record info into input fields
        nameInput.value = name;
        stepsInput.value = steps;
        caloriesInput.value = calories;

        // Activate edit button
        editButton.removeAttribute('disabled');
    
        // Deactivate add button
        addButton.setAttribute('disabled', 'disabled');

        // Set id attribute
        formElement.setAttribute('data-record-id', recordId);
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', async () => {
        // Send delete request
        await fetch(`${baseUrl}/${recordId}`, {
            method: 'DELETE', 
        });

        // fetch all records
        await loadRecords();
    })

    const divButtons = document.createElement('div');
    divButtons.classList.add('btn-wrapper');
    divButtons.appendChild(changeButton);
    divButtons.appendChild(deleteButton);

    const recordLiElement = document.createElement('li');
    recordLiElement.classList.add('record');
    recordLiElement.appendChild(divContentElement);
    recordLiElement.appendChild(divButtons);

    return recordLiElement;
}

function clearInputs() {
    nameInput.value = '';
    stepsInput.value = '';
    caloriesInput.value = '';
}