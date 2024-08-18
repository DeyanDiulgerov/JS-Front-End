const baseUrl = `http://localhost:3030/jsonstore/matches`;

const loadButton = document.getElementById('load-matches');
const addButton = document.getElementById('add-match');
const editButton = document.getElementById('edit-match');

const matchList = document.getElementById('list');
const formElement = document.querySelector('#form form');

const hostInput = document.getElementById('host');
const scoreInput = document.getElementById('score');
const guestInput = document.getElementById('guest');

loadButton.addEventListener('click', loadMatches);
addButton.addEventListener('click', addMatch);
editButton.addEventListener('click', editMatch);

async function addMatch() {
    // Get input information
    const host = hostInput.value;
    const score = scoreInput.value;
    const guest = guestInput.value;

    // Clear input fields -- MAYBE clear after the creation
    clearInputs();

    // Create post request
    await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ host, score, guest }),
    });

    // Get request / fetch all matches
    await loadMatches();
}

async function editMatch() {
    // Get id from form attribute
    const matchId = formElement.getAttribute('data-match-id');

    // Get info from inputs
    const host = hostInput.value;
    const score = scoreInput.value;
    const guest = guestInput.value;

    // Clear inputs
    clearInputs();

    // Send put request
    await fetch(`${baseUrl}/${matchId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ host, score, guest, _id: matchId }),
    });

    // Load all matches
    await loadMatches();

    // Deactivate edit button
    editButton.setAttribute('disabled', 'disabled');

    // Activate add button
    addButton.removeAttribute('disabled');

    // Clear Id
    formElement.removeAttribute('data-match-id');
}

async function loadMatches() {
    // Clear match list
    matchList.innerHTML = '';

    // Get request
    const response = await fetch(baseUrl);
    const result = await response.json();
    const matches = Object.values(result);

    // Create match element
    const matchElements = matches.map(match => createMatchElement(match.host, match.score, match.guest, match._id));

    // Add to match list
    matchList.append(...matchElements);

    // Description says to deactivate but Load Matches test passes only without this line of code
    // Deactivate edit button == IT IS NEEDED / already was deactivated
    editButton.setAttribute('disabled', 'disabled');// == NEEDED
}

function createMatchElement(host, score, guest, matchId) {
    const pHostElement = document.createElement('p');
    pHostElement.textContent = host;
    const pScoreElement = document.createElement('p');
    pScoreElement.textContent = score;
    const pGuestElement = document.createElement('p');
    pGuestElement.textContent = guest;

    const divInfoElement = document.createElement('div');
    divInfoElement.classList.add('info');
    divInfoElement.appendChild(pHostElement);
    divInfoElement.appendChild(pScoreElement);
    divInfoElement.appendChild(pGuestElement);

    const changeButton = document.createElement('button');
    changeButton.classList.add('change-btn');
    changeButton.textContent = 'Change';
    changeButton.addEventListener('click', () => {
        // Populate match info into input fields
        hostInput.value = host;
        scoreInput.value = score;
        guestInput.value = guest;

        // Activate edit button
        editButton.removeAttribute('disabled');

        // Deactivate add button 
        addButton.setAttribute('disabled', 'disabled');

        // Set id attribute
        formElement.setAttribute('data-match-id', matchId);
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', async () => {
        // Send delete request
        await fetch(`${baseUrl}/${matchId}`, {
            method: 'DELETE',
        });

        // Fetch all matches
        await loadMatches();
    });

    const divButtons = document.createElement('div');
    divButtons.classList.add('btn-wrapper');
    divButtons.appendChild(changeButton);
    divButtons.appendChild(deleteButton);

    const matchLiElement = document.createElement('li');
    matchLiElement.classList.add('match');
    matchLiElement.appendChild(divInfoElement);
    matchLiElement.appendChild(divButtons);

    return matchLiElement;
}

function clearInputs () {
    hostInput.value = '';
    scoreInput.value = '';
    guestInput.value = '';
}