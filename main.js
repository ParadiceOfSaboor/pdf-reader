// main.js

// Function to handle PDF upload and text extraction
document.getElementById('upload-pdf').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Show progress bar and hide content
            document.getElementById('progress-container').style.display = 'block';
            document.getElementById('novel-content').innerText = '';

            const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
            const totalPages = pdf.numPages;
            let text = '';
            let currentPage = 1;

            const processPage = async (pageNum) => {
                const page = await pdf.getPage(pageNum);
                const content = await page.getTextContent();
                text += content.items.map((item) => item.str).join(' ') + '\n\n';

                // Update progress bar
                document.getElementById('progress-bar').style.width = `${(pageNum / totalPages) * 100}%`;

                if (pageNum < totalPages) {
                    processPage(pageNum + 1); // Process next page
                } else {
                    // Once all pages are processed, update the content
                    document.getElementById('novel-content').innerText = text;
                    document.getElementById('progress-container').style.display = 'none'; // Hide progress bar
                }
            };

            processPage(currentPage); // Start processing the first page
        }
    });
    input.click();
});

// Function to toggle dark mode
document.getElementById('toggle-dark-mode').addEventListener('click', () => {
    const body = document.body;
    const button = document.getElementById('toggle-dark-mode');

    body.classList.toggle('dark-theme');
    button.classList.toggle('active');

    if (button.classList.contains('active')) {
        button.innerText = 'Light Mode';
    } else {
        button.innerText = 'Dark Mode';
    }
});
