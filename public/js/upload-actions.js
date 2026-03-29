fetch('/upload/files')
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to load files');
        }
        return res.json();
    })
    .then(files => {
        const fileList = document.getElementById('file-list');

        if (!files.length) {
            fileList.innerHTML = '<li class="file-item">No files uploaded yet.</li>';
            return;
        }

        files.forEach(file => {
            const item = document.createElement('li');
            item.className = 'file-item';
            item.textContent = file.filename;
            fileList.appendChild(item);
        });
    })
    .catch(() => {
        document.getElementById('file-list').innerHTML =
            '<li class="file-item">Could not load files.</li>';
    });