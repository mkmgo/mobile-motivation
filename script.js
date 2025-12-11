document.addEventListener('DOMContentLoaded', () => {
    const tileContainer = document.getElementById('tileContainer');
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // --- Theme Toggle Functionality ---
    const updateThemeButton = (theme) => {
        // Corrected Logic: Icon shows the CURRENT theme (Moon for Dark, Sun for Light)
        themeToggle.innerHTML = theme === 'dark' ? '🌙' : '☀️'; 
        
        // ARIA label still describes the ACTION that will happen next
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    };

    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    };

    // Initialize button icon based on current theme
    updateThemeButton(htmlElement.getAttribute('data-theme'));
    themeToggle.addEventListener('click', toggleTheme);


    // --- Tile Loading & Reflection Save Functionality ---
    fetch('content.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Reverse the array to show most recent first
            const reversedTiles = data.slice().reverse();

            reversedTiles.forEach(tile => {
                const article = document.createElement('article');
                article.className = `motivation-tile tile-${tile.tile_color}`;
                article.id = tile.tile_id; // Unique ID for saving/loading

                // Extract and clean up date from tile_content
                const dateMatch = tile.tile_content.match(/<i>(.*?)<\/i>/);
                const date = dateMatch ? dateMatch[1] : 'No date available';
                // Remove the date tag from the main content
                const cleanedContent = tile.tile_content.replace(/<p><i>(.*?)<\/i><\/p>|<p><i>(.*?)<\/i>|<p>(.*?)<\/i><\/p>|<i>(.*?)<\/i>/, '');

                // Updated inline style for media: width: 30% and left alignment
                article.innerHTML = `
                    <h2>${tile.tile_title}</h2>
                    ${tile.media_link ? `<img src="${tile.media_link}" alt="Tile Media" style="display: block; width: 30%; max-width: 300px; margin: 10px 0 20px 0; border-radius: 8px;">` : ''}
                    <p><strong>Date:</strong> ${date}</p>
                    ${cleanedContent}
                    <textarea id="reflection-text-${tile.tile_id}" placeholder="${tile.reflection_prompt}"></textarea>
                    <button class="tile-button">Save Reflection</button>
                    <p id="status-message-${tile.tile_id}" class="status-message"></p>
                `;

                tileContainer.appendChild(article);

                // --- Reflection Save/Load Logic ---
                const textarea = document.getElementById(`reflection-text-${tile.tile_id}`);
                const saveButton = article.querySelector('.tile-button');
                const statusMessage = document.getElementById(`status-message-${tile.tile_id}`);
                const storageKey = `reflection-${tile.tile_id}`;

                // 1. Load existing reflection from local storage
                const savedReflection = localStorage.getItem(storageKey);
                if (savedReflection) {
                    textarea.value = savedReflection;
                }

                // 2. Add save listener to the button
                saveButton.addEventListener('click', () => {
                    localStorage.setItem(storageKey, textarea.value);
                    
                    // Show confirmation message
                    statusMessage.textContent = 'Reflection saved successfully! ✅';
                    statusMessage.style.opacity = '1';

                    // Hide confirmation message after a few seconds
                    setTimeout(() => {
                        statusMessage.style.opacity = '0';
                    }, 3000);
                });
            });
        })
        .catch(error => console.error('Error loading tile data:', error));
});