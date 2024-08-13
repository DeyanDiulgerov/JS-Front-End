window.addEventListener("load", solve);

function solve() {
    
    const studentInputElement = document.getElementById('student');
    const universityInputElement = document.getElementById('university');
    const scoreInputElement = document.getElementById('score'); 
    const nextButtonElement = document.getElementById('next-btn'); 
    const previewListElement = document.getElementById('preview-list');  
    const candidatesListElement = document.getElementById('candidates-list');  

    nextButtonElement.addEventListener('click', () => {
        // Get input information
        const student = studentInputElement.value;
        const university = universityInputElement.value;
        const score = scoreInputElement.value;

        // Check if elements are empty
        if(!student || !university || !score) {
            return;
        }

        // Create preview element
        const previewLiElement = createPreviewElement(student, university, score);

        // Add to preview list
        previewListElement.appendChild(previewLiElement);

        // Disable next button
        nextButtonElement.setAttribute('disabled', 'disabled');

        // Clear input fields
        clearInputs();
    });

    function createPreviewElement(student, university, score) {
        const editButtonElement = document.createElement('button');
        editButtonElement.classList.add('edit');
        editButtonElement.textContent = "EDIT";

        const applyButtonElement = document.createElement('button');
        applyButtonElement.classList.add('apply');
        applyButtonElement.textContent = "APPLY";

        const studentH4Element = document.createElement('h4');
        studentH4Element.textContent = `${student}`;
        const universityPElement = document.createElement('p');
        universityPElement.textContent = `University: ${university}`;
        const scorePElement = document.createElement('p');
        scorePElement.textContent = `Score: ${score}`;

        const articleElement = document.createElement('article');
        articleElement.appendChild(studentH4Element);
        articleElement.appendChild(universityPElement);
        articleElement.appendChild(scorePElement);

        const previewLiElement = document.createElement('li');
        previewLiElement.classList.add('application');
        previewLiElement.appendChild(articleElement);
        previewLiElement.appendChild(editButtonElement);
        previewLiElement.appendChild(applyButtonElement);

        // Event listeners for Edit && Apply
        // Edit button
        editButtonElement.addEventListener('click', () => {
            // Send info back to input
            studentInputElement.value = student;
            universityInputElement.value = university;
            scoreInputElement.value = score;

            // Remove from preview list
            previewLiElement.remove();

            // Enable next button 
            nextButtonElement.removeAttribute('disabled');
        });
        // Apply button
        applyButtonElement.addEventListener('click', () => {
            // Remove buttons (edit, apply)
            editButtonElement.remove();
            applyButtonElement.remove();

            previewListElement.innerHTML = '';
            
            // Add to candidate list
            candidatesListElement.appendChild(previewLiElement);

            // Enable next button
            nextButtonElement.removeAttribute('disabled');
        });

        return previewLiElement;
        
    }

    function clearInputs() {
        studentInputElement.value = '';
        universityInputElement.value = '';
        scoreInputElement.value = '';
    }
}