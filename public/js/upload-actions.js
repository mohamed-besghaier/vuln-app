fetch('/upload/files')
    .then(res => {
        if (!res.ok) throw new Error('Failed to load files');
        return res.json();
    })
    .then(files => {
        const fileList = document.getElementById('file-list');
        fileList.innerHTML = '';

        if (!files.length) {
            fileList.innerHTML = '<li class="file-item">No files uploaded yet.</li>';
            return;
        }

        files.forEach(file => {
            const item = document.createElement('li');
            item.className = 'file-item';

            // Image preview (optional)
            if (file.filename.match(/\.(jpg|jpeg|png|gif)$/i)) {
                const img = document.createElement('img');
                img.src = file.url;
                img.style.maxWidth = '200px';
                item.appendChild(img);
            }

            // Download link
            const link = document.createElement('a');
            link.href = file.url;
            link.textContent = file.filename;
            link.target = '_blank';

            item.appendChild(document.createElement('br'));
            item.appendChild(link);

            fileList.appendChild(item);
        });
    })
    .catch(() => {
        document.getElementById('file-list').innerHTML =
            '<li class="file-item">Could not load files.</li>';
    });