const baseUrl = `http://localhost:3030/jsonstore/games/`;

// Get load button element
const loadButton = document.getElementById('load-games');
const addButton = document.getElementById('add-game');
const editButton = document.getElementById('edit-game');
const gameList = document.getElementById('games-list');
const formElement = document.querySelector('#form form');

const nameInput = document.getElementById('g-name');
const typeInput = document.getElementById('type');
const playersInput = document.getElementById('players');

// Load games
loadButton.addEventListener('click', loadGames);
addButton.addEventListener('click', addGame);
editButton.addEventListener('click', editGame);

async function addGame() {
    // Get input information
    const name = nameInput.value;
    const type = typeInput.value;
    const players = playersInput.value;
    
    // Clear input fields FIRST - !!! test is written to expect cleared inputes b4 post request !!!
    clearInputs();

    // Create post request
    await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, type, players }),
    });

    // Fetch all games
    await loadGames();
} 

async function editGame() {
    // Get id from form attribute
    const gameId = formElement.getAttribute('data-game-id');

    // Get info from inputs
    const name = nameInput.value;
    const type = typeInput.value;
    const players = playersInput.value;

    // Clear inputs
    clearInputs();

    // Send put request
    await fetch(`${baseUrl}/${gameId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, type, players, _id: gameId }),
    });

    // Load all games
    await loadGames();

    // Deactivate edit button
    editButton.setAttribute('disabled', 'disabled');

    // Activate add button
    addButton.removeAttribute('disabled');

    // Clear ID
    formElement.removeAttribute('data-game-id');
}

async function loadGames() {
    // Clear games list
    gameList.innerHTML = '';  

    // Get request
    const response = await fetch(baseUrl);
    const result = await response.json();
    const games = Object.values(result);

    // Create game element
    const gameElements = games.map(game => createGameElement(game.name, game.type, game.players, game._id));

    // Add to game list 'games-list'
    gameList.append(...gameElements);
}

function createGameElement(name, type, players, gameId) {
    const pNameElement = document.createElement('p');
    pNameElement.textContent = name;

    const pTypeElement = document.createElement('p');
    pTypeElement.textContent = type;
    
    const pMaxPlayersElement = document.createElement('p');
    pMaxPlayersElement.textContent = players;

    const divContentElement = document.createElement('div');
    divContentElement.classList.add('content');
    divContentElement.appendChild(pNameElement);
    divContentElement.appendChild(pTypeElement);
    divContentElement.appendChild(pMaxPlayersElement);

    const changeButton = document.createElement('button');
    changeButton.classList.add('change-btn');
    changeButton.textContent = 'Change';
    changeButton.addEventListener('click', () => {
        // Populate game info into input fields
        nameInput.value = name;
        typeInput.value = type;
        playersInput.value = players;

        // Activate edit game button
        editButton.removeAttribute('disabled');

        // Deactivate add game button
        addButton.setAttribute('disabled', 'disabled');

        // Set id attribute
        formElement.setAttribute('data-game-id', gameId);
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', async () => {
        // Send delete request
        await fetch(`${baseUrl}/${gameId}`, {
            method: 'DELETE',
        });

        // fetch all games
        await loadGames();
    });

    const divButtons = document.createElement('div');
    divButtons.classList.add('buttons-container');
    divButtons.appendChild(changeButton);
    divButtons.appendChild(deleteButton);

    const gameDivElement = document.createElement('div');
    gameDivElement.classList.add('board-game');
    gameDivElement.appendChild(divContentElement);
    gameDivElement.appendChild(divButtons);

    return gameDivElement;
}

function clearInputs() {
    nameInput.value = '';
    typeInput.value = '';
    playersInput.value = '';
}