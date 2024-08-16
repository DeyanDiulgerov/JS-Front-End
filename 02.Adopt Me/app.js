window.addEventListener("load", solve);

function solve() {
    const adoptButtonElement = document.getElementById('adopt-btn');

    const typeInputElement = document.getElementById('type');
    const ageInputElement = document.getElementById('age');
    const genderInputElement = document.getElementById('gender');

    const checkListElement = document.getElementById('adoption-info');
    const adoptedListElement = document.getElementById('adopted-list');

    adoptButtonElement.addEventListener('click', () => {
        // Get input information
        const type = typeInputElement.value;
        const age = ageInputElement.value;
        const gender = genderInputElement.value;
        // Clear inputs
        clearInputs();

        // Check for empty strings
        if(!type || !age || !gender) {
            return;
        }

        // Create check element
        const checkLiElement = createArticleElement(type, age, gender);

        // Add to check list
        checkListElement.appendChild(checkLiElement);

    });

    function createArticleElement(type, age, gender) {
        const editButtonElement = document.createElement('button');
        editButtonElement.classList.add('edit-btn');
        editButtonElement.textContent = 'Edit';

        const doneButtonElement = document.createElement('button');
        doneButtonElement.classList.add('done-btn');
        doneButtonElement.textContent = 'Done';

        const buttonsDivElement = document.createElement('div');
        buttonsDivElement.classList.add('buttons');
        buttonsDivElement.appendChild(editButtonElement);
        buttonsDivElement.appendChild(doneButtonElement);

        const typePElement = document.createElement('p');
        typePElement.textContent = `Pet:${type}`;
        const agePElement = document.createElement('p');
        agePElement.textContent = `Age:${age}`;
        const genderPElement = document.createElement('p');
        genderPElement.textContent = `Gender:${gender}`;

        const articleElement = document.createElement('article');
        articleElement.appendChild(typePElement);
        articleElement.appendChild(genderPElement);
        articleElement.appendChild(agePElement);

        const checkLiElement = document.createElement('li');
        checkLiElement.appendChild(articleElement);
        checkLiElement.appendChild(buttonsDivElement);

        // Event listeners
        // Edit Button
        editButtonElement.addEventListener('click', () => {
            // Send info back to input
            typeInputElement.value = type;
            ageInputElement.value = age;
            genderInputElement.value = gender;

            // Remove from check list
            checkLiElement.remove();
        });

        // Done Button
        doneButtonElement.addEventListener('click', () => {
            // Remove buttons edit and done
            buttonsDivElement.remove();

            // Add clear button
            const clearButtonElement = document.createElement('button');
            clearButtonElement.classList.add('clear-btn');
            clearButtonElement.textContent = 'Clear';

            checkLiElement.appendChild(clearButtonElement);

            // Add to adopted list
            adoptedListElement.appendChild(checkLiElement);

            clearButtonElement.addEventListener('click', () => {
                // delete from adopted list
                checkLiElement.remove();
            });
        });

        return checkLiElement;
    }

    function clearInputs() {
      typeInputElement.value = '';
      ageInputElement.value = '';
      genderInputElement.value = '';
    }
}
  