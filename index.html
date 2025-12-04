document.addEventListener('DOMContentLoaded', () => {
    const tileContainer = document.getElementById('tileContainer');
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // --- Theme Toggle Functionality ---
    const updateThemeButton = (theme) => {
        themeToggle.textContent = theme === 'dark' ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙';
    };

    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    };

    // Initialize button text based on current theme
    updateThemeButton(htmlElement.getAttribute('data-theme'));
    themeToggle.addEventListener('click', toggleTheme);


    // --- Tile Loading Functionality ---
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
                article.id = tile.tile_id;

                // Extract and clean up date from tile_content
                const dateMatch = tile.tile_content.match(/<i>(.*?)<\/i>/);
                const date = dateMatch ? dateMatch[1] : 'No date available';
                const cleanedContent = tile.tile_content.replace(/<p><i>(.*?)<\/i><\/p>|<p><i>(.*?)<\/i>|<p>(.*?)<\/i><\/p>|<i>(.*?)<\/i>/, '');

                article.innerHTML = `
                    <h2>${tile.tile_title}</h2>
                    ${tile.media_link ? `<img src="${tile.media_link}" alt="Tile Media" style="display: block; width: 100%; max-width: 300px; margin: 10px auto 20px auto; border-radius: 8px;">` : ''}
                    <p><strong>Date:</strong> ${date}</p>
                    ${cleanedContent}
                    <textarea placeholder="${tile.reflection_prompt}"></textarea>
                    <button class="tile-button">Save Reflection</button>
                    <p class="status-message"></p>
                `;

                tileContainer.appendChild(article);
            });
        })
        .catch(error => console.error('Error loading tile data:', error));
});