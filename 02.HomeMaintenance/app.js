window.addEventListener("load", solve);

function solve() {
    const placeInputElement = document.getElementById('place');
    const actionInputElement = document.getElementById('action');
    const personInputElement = document.getElementById('person'); 
    const addButtonElement = document.getElementById('add-btn'); 
    const taskListElement = document.getElementById('task-list');     
    const doneListElement = document.getElementById('done-list');  

    addButtonElement.addEventListener('click', () => {
        // Get input information
        const place = placeInputElement.value;
        const action = actionInputElement.value;
        const person = personInputElement.value;

        // Create task element
        const taskLiElement = createTaskElement(place, action, person);

        // Add to task list
        taskListElement.appendChild(taskLiElement);

        // Clear input fields
        clearInputs();
    });

    function createTaskElement(place, action, person) {
        const editButtonElement = document.createElement('button');
        editButtonElement.classList.add('edit')
        editButtonElement.textContent = "Edit";

        const doneButtonElement = document.createElement('button');
        doneButtonElement.classList.add('done')
        doneButtonElement.textContent = "Done";
        
        const buttonsDivElement = document.createElement('div');
        buttonsDivElement.classList.add('buttons');
        buttonsDivElement.appendChild(editButtonElement);
        buttonsDivElement.appendChild(doneButtonElement);

        const placePElement = document.createElement('p');
        placePElement.textContent = `Place:${place}`;
        const actionPElement = document.createElement('p');
        actionPElement.textContent = `Action:${action}`;
        const personPElement = document.createElement('p');
        personPElement.textContent = `Person:${person}`;

        const articleElement = document.createElement('article');
        articleElement.appendChild(placePElement);
        articleElement.appendChild(actionPElement);
        articleElement.appendChild(personPElement);

        const taskLiElement = document.createElement('li');
        taskLiElement.classList.add('clean-task');
        taskLiElement.appendChild(articleElement);
        taskLiElement.appendChild(buttonsDivElement);

        // Event listeners
        editButtonElement.addEventListener('click', () => {
            // Send info back to inputs
            placeInputElement.value = place;
            actionInputElement.value = action;
            personInputElement.value = person;

            // Remove from Tasks
            taskLiElement.remove();

        });

        // doneButtonElement
        doneButtonElement.addEventListener('click', () => {
            // Remove buttons (edit, done)
            buttonsDivElement.remove();

            // Add delete button
            const deleteButtonElement = document.createElement('button');
            deleteButtonElement.classList.add('delete');
            deleteButtonElement.textContent = 'Delete';

            taskLiElement.appendChild(deleteButtonElement);

            // Add to done list
            doneListElement.appendChild(taskLiElement);

            deleteButtonElement.addEventListener('click', () => {
                // delete task from done list
                taskLiElement.remove();
            });
        });

        return taskLiElement;
    }

    function clearInputs() {
        placeInputElement.value = '';
        actionInputElement.value = '';
        personInputElement.value = '';
    }
}