document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('reflectionInput');
    const saveButton = document.getElementById('saveReflectionBtn');
    const status = document.getElementById('reflectionStatus');
    const STORAGE_KEY = 'stoicMobile_morningReflection';

    /**
     * 1. Load any previously saved reflection when the page loads.
     */
    function loadReflection() {
        const savedText = localStorage.getItem(STORAGE_KEY);
        if (savedText) {
            input.value = savedText;
            status.textContent = 'Last reflection loaded.';
            status.style.opacity = 1;
        } else {
            status.textContent = '';
        }
    }

    /**
     * 2. Save the current content of the textarea to localStorage.
     */
    function saveReflection() {
        const textToSave = input.value.trim();
        
        if (textToSave === "") {
            localStorage.removeItem(STORAGE_KEY);
            status.textContent = 'Reflection cleared.';
        } else {
            // Save the reflection locally on the user's device
            localStorage.setItem(STORAGE_KEY, textToSave);
            status.textContent = 'Reflection saved successfully!';
        }

        // Display status message briefly
        status.style.opacity = 1;
        setTimeout(() => {
            status.style.opacity = 0;
        }, 3000);
    }

    // Attach the save function to the button click event
    saveButton.addEventListener('click', saveReflection);

    // Initial load
    loadReflection();
});