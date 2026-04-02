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

            const fileName = document.createElement('span');
            fileName.textContent = file.filename;
            fileName.className = 'file-name';

            const download_btn = document.createElement('button');
            download_btn.textContent = 'Download';
            download_btn.className = 'form-button push-right';

            download_btn.onclick = () => {
                const a = document.createElement('a');
                a.href = file.url;
                a.download = file.filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };

            const delete_btn = document.createElement('button');
            delete_btn.textContent = 'Delete';
            delete_btn.className = 'form-button';

            delete_btn.onclick = () => {
                fetch(`/upload/delete/${file.id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            item.remove();
                        } else {
                            alert('Failed to delete: ' + data.message);
                        }
                    })
                    .catch(err => console.error(err));
            };

            item.appendChild(fileName);
            item.appendChild(download_btn);
            item.appendChild(delete_btn);

            fileList.appendChild(item);
        });
    })
    .catch(() => {
        document.getElementById('file-list').innerHTML =
            '<li class="file-item">Could not load files.</li>';
    });