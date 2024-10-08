const title = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const addBtn = document.getElementById("addbtn"); // Fixed: lowercase "addbtn"
const ul = document.getElementById('songList');

addBtn.addEventListener('click', () => {
    const newTitle = title.value;
    const newArtist = artist.value;

    // Create the elements for the new song
    const p = document.createElement('p');
    const small = document.createElement('small');
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');

    p.innerHTML = newTitle;
    small.innerHTML = newArtist;

    p.classList.add('mb-0');
    small.classList.add('text-muted');

    // Delete button properties
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteBtn.innerHTML = 'Delete';

    
    // Append the elements to the list item
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    li.append(p);
    li.append(small);
    li.append(deleteBtn);

    // Append the list item to the song list
    ul.append(li);

    // Clear the input fields
    title.value = '';
    artist.value = '';
});

console.log(title, artist, addBtn);