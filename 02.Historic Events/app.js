window.addEventListener("load", solve);

function solve() {
    const nameInputElement = document.getElementById('name');
    const timeInputElement = document.getElementById('time');
    const descriptionInputElement = document.getElementById('description'); 

    const addButtonElement = document.getElementById('add-btn'); 
    
    const previewListElement = document.getElementById('preview-list');     
    const archiveListElement = document.getElementById('archive-list'); 

    addButtonElement.addEventListener('click', () => {
        // Get input information
        const name = nameInputElement.value
        const time = timeInputElement.value;
        const description = descriptionInputElement.value;

        // Check for empty inputs
        if(!name || !time || !description) {
            return;
        }

        // Create event element
        const eventLiElement = createEventElement(name, time, description);

        // Add to preview events list
        previewListElement.appendChild(eventLiElement);

        // Disable add button
        addButtonElement.setAttribute('disabled', 'disabled');

        // clear inputs
        clearInputs();
    });

    function createEventElement(name, time, description) {
        const editButtonElement = document.createElement('button');
        editButtonElement.classList.add('edit-btn');
        editButtonElement.textContent = 'Edit';
        editButtonElement.addEventListener('click', () => {
            // Send info back to inputs
            nameInputElement.value = name;
            timeInputElement.value = time;
            descriptionInputElement.value = description;
            
            // Remove from preview list
            eventLiElement.remove();

            // Enable add button
            addButtonElement.removeAttribute('disabled');
        });

        const nextButtonElement = document.createElement('button');
        nextButtonElement.classList.add('next-btn');
        nextButtonElement.textContent = 'Next';
        nextButtonElement.addEventListener('click', () => {
            // Remove buttons (edit, next)  
            buttonsDivElement.remove();

            // Add archive button
            const archiveButtonElement = document.createElement('button');
            archiveButtonElement.classList.add('archive-btn');
            archiveButtonElement.textContent = 'Archive';

            // Add new button to our event
            eventLiElement.appendChild(archiveButtonElement);

            // Remove from preview list

            // Add to archive list
            archiveListElement.appendChild(eventLiElement);

            // archive button event listener
            archiveButtonElement.addEventListener('click', () => {
                // Delete from archive list
                eventLiElement.remove();
                
                // Enable add button
                addButtonElement.removeAttribute('disabled');
            });
        });

        const buttonsDivElement = document.createElement('div');
        buttonsDivElement.classList.add('buttons');
        buttonsDivElement.appendChild(editButtonElement);
        buttonsDivElement.appendChild(nextButtonElement);

        const namePElement = document.createElement('p');
        namePElement.textContent = `${name}`;
        const timePElement = document.createElement('p');
        timePElement.textContent = `${time}`;
        const descriptionPElement = document.createElement('p');
        descriptionPElement.textContent = `${description}`;

        const articleElement = document.createElement('article');
        articleElement.appendChild(namePElement);
        articleElement.appendChild(timePElement);
        articleElement.appendChild(descriptionPElement);

        const eventLiElement = document.createElement('li');
        eventLiElement.appendChild(articleElement);
        eventLiElement.appendChild(buttonsDivElement);

        return eventLiElement;
    }

    function clearInputs() {
        nameInputElement.value = '';
        timeInputElement.value = '';
        descriptionInputElement.value = '';
    }
}