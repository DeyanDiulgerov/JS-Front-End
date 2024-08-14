window.addEventListener("load", solve);

function solve() {
    const addButtonElement = document.getElementById('add-btn');
    const nameInputElement = document.getElementById('name');
    const numberInputElement = document.getElementById('phone');
    const categoryInputElement = document.getElementById('category');
    const checkListElement = document.getElementById('check-list');
    const contactListElement = document.getElementById('contact-list');

    addButtonElement.addEventListener('click', () => {
        // Get input information
        const name = nameInputElement.value;
        const number = numberInputElement.value;
        const category = categoryInputElement.value;

        // Check if elements are empty
        if(!name || !number || !category) {
            return;
        }
        
        // Create check element
        const checkLiElement = createArticleElement(name, number, category);

        // Add to check list
        checkListElement.appendChild(checkLiElement);

        // Clear inputs 
        clearInputs();
    });

    function createArticleElement(name, number, category) {
        const editButtonElement = document.createElement('button');
        editButtonElement.classList.add('edit-btn');
        editButtonElement.textContent = 'Edit'; // probably not needed == remove

        const saveButtonElement = document.createElement('button');
        saveButtonElement.classList.add('save-btn');
        saveButtonElement.textContent = 'Save'; // probably not needed == remove

        const buttonsDivElement = document.createElement('div');
        buttonsDivElement.classList.add('buttons');
        buttonsDivElement.appendChild(editButtonElement);
        buttonsDivElement.appendChild(saveButtonElement);

        const namePElement = document.createElement('p');
        namePElement.textContent = `name:${name}`;
        const numberPElement = document.createElement('p');
        numberPElement.textContent = `phone:${number}`;
        const categoryPElement = document.createElement('p');
        categoryPElement.textContent = `category:${category}`;

        const articleElement = document.createElement('article');
        articleElement.appendChild(namePElement);
        articleElement.appendChild(numberPElement);
        articleElement.appendChild(categoryPElement);

        const checkLiElement = document.createElement('li');
        checkLiElement.appendChild(articleElement);
        checkLiElement.appendChild(buttonsDivElement);

        // Event listeners
        // Edit Button
        editButtonElement.addEventListener('click', () => {
            // Send info back to input
            nameInputElement.value = name;
            numberInputElement.value = number;
            categoryInputElement.value = category;

            // Remove from check list
            checkLiElement.remove();
        });

        // Save Button
        saveButtonElement.addEventListener('click', () => {
            // Remove buttons edit and save
            buttonsDivElement.remove();

            // Add delete button
            const deleteButtonElement = document.createElement('button');
            deleteButtonElement.classList.add('del-btn');
            deleteButtonElement.textContent = 'Delete'; // probably not needed == remove

            checkLiElement.appendChild(deleteButtonElement);

            // Add to contact list
            contactListElement.appendChild(checkLiElement);

            deleteButtonElement.addEventListener('click', () => {
                // delete from contact list
                checkLiElement.remove();
            })
        });

        return checkLiElement;
    }

    function clearInputs() {
        nameInputElement.value = '';
        numberInputElement.value = '';
        categoryInputElement.value = '';
    }
}
  