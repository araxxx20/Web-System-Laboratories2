const title = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const addBtn = document.getElementById("addbtn");
const ul = document.getElementById('songList');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Add new song
addBtn.addEventListener('click', () => {
    const newTitle = title.value;
    const newArtist = artist.value;

    newTitle && newArtist && (() => {
        const p = document.createElement('p');
        const small = document.createElement('small');
        const li = document.createElement('li');
        const deleteBtn = document.createElement('button');

        p.innerHTML = newTitle;
        small.innerHTML = newArtist;

        p.classList.add('mb-0');
        small.classList.add('text-muted');

        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteBtn.innerHTML = 'Delete';

        deleteBtn.addEventListener('click', () => {
            ul.removeChild(li);
        });

        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.append(p);
        li.append(small);
        li.append(deleteBtn);
        ul.append(li);

        title.value = '';
        artist.value = '';
    })();
});

// Search functionality
searchBtn.addEventListener('click', () => {
    const filter = searchInput.value.toLowerCase();
    const items = Array.from(ul.getElementsByTagName('li'));

    items.forEach(item => {
        const songTitle = item.getElementsByTagName('p')[0].innerText.toLowerCase();
        item.style.display = songTitle.includes(filter) ? '' : 'none';
    });
});
