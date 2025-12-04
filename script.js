document.addEventListener('DOMContentLoaded', () => {
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            // Reverse the array
            const reversedTiles = data.slice().reverse();

            const container = document.getElementById('tileContainer');
            reversedTiles.forEach(tile => {
                const article = document.createElement('article');
                article.className = `motivation-tile tile-${tile.tile_color}`;
                article.id = tile.tile_id;

                // Extract date from tile_content
                const dateMatch = tile.tile_content.match(/<i>(.*?)<\/i>/);
                const date = dateMatch ? dateMatch[1] : 'No date available';

                article.innerHTML = `
                    <h2>${tile.tile_title}</h2>
                    ${tile.media_link ? `<img src="${tile.media_link}" alt="Media" style="width:50%; max-width:300px; margin-top:10px;">` : ''}
                    <p>${tile.tile_content.replace(/<i>(.*?)<\/i>/, '')}</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <textarea placeholder="${tile.reflection_prompt}"></textarea>
                    <button class="tile-button">Save Reflection</button>
                    <p class="status-message"></p>
                `;

                container.appendChild(article);
            });
        })
        .catch(error => console.error('Error loading tile data:', error));
});