document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');

    // Function to load content from a URL and replace the container's content
    const loadPage = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();

            // Create a temporary div to parse the HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Find the new content to replace, e.g., the main tag
            const newContent = tempDiv.querySelector('#app-container').innerHTML;

            if (newContent) {
                // Replace the existing content with the new content
                appContainer.innerHTML = newContent;

                // Update the URL in the address bar without reloading
                window.history.pushState({ path: url }, '', url);

                // Re-attach event listeners for the new content
                attachEventListeners();
            } else {
                console.error('Could not find content to replace in the loaded page.');
            }
        } catch (error) {
            console.error('Failed to load the page:', error);
            // Optionally, fall back to a full page reload if fetch fails
            window.location.href = url;
        }
    };

    // Attach click listeners to all internal links
    const attachEventListeners = () => {
        document.querySelectorAll('a[href]').forEach(link => {
            // Remove previous listeners to avoid duplicates
            link.removeEventListener('click', handleLinkClick);
            link.addEventListener('click', handleLinkClick);
        });

        // Re-run your game.js and other scripts on the newly loaded content
        // This is crucial. You need to re-initialize your game logic.
        if (window.initGame) {
            window.initGame();
        }
    };

    const handleLinkClick = (event) => {
        const url = new URL(event.currentTarget.href);
        const currentUrl = new URL(window.location.href);

        // Only handle internal links
        if (url.origin === currentUrl.origin) {
            event.preventDefault(); // Prevent the default browser navigation
            loadPage(url.pathname);
        }
    };

    // Initial attachment of event listeners
    attachEventListeners();

    // Handle back/forward button clicks
    window.addEventListener('popstate', (event) => {
        loadPage(window.location.pathname);
    });
});