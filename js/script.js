// VARIABLES

const movies = [];
const addMovie = document.querySelector('.btn-add');
const input = document.querySelector('.input');
const output = document.querySelector('#list-output');


// FUNCTIONS

function loadList() {
    for (let i = 0; i < localStorage.length; i++) {
        let movieId = localStorage.key(i);
        let movie = localStorage.getItem(movieId);
        movies.push(JSON.parse(movie));
    }

    render();
}

function createMovie (text) {
    const movie = {
        id: `${Date.now()}`,
        date: getDate(),
        text: text,
        isWatched: false,
    }

    movies.push(movie);

    render();

    localStorage.setItem((`${movie.id}`), JSON.stringify(movie));    
}

function deleteMovie (id) {
    const movieToDelete = movies.findIndex(movie => movie.id === id);
    movies.splice(movieToDelete, 1);

    localStoragedeleteMovie(id);

    render();
}

function clearWatched() {
    for (let i = movies.length - 1; i >= 0; i--){
        if (movies[i].isWatched === true) {
            localStorage.removeItem(movies[i].id);
            movies.splice(i, 1);
        }
    }

    render();
}

function completemovie (id) {
    const movieToComplete = movies.find(movieToComplete => movieToComplete.id === id);
    if (movieToComplete) {
        movieToComplete.isWatched = !movieToComplete.isWatched;
    }

    localStorageCompletemovie(id);

    render();
}

function render() {
    let html;

    movies.length === 0 ? 
        html = '<p class="output-empty">no movies yet</p>' :
        html = '';

    const sortedMovies = movies.sort((a, b) => a.id - b.id);
    
    sortedMovies.forEach(movie => {

        if(movie.isWatched === false) {
            html += `
                    <div id="output" class="output">
                        <div class="output-elements">
                            <input onclick="completemovie('${movie.id}')" class="checkbox" type="checkbox" name="" id="cb" />
                            <p class="movie-to-watch">${movie.text}</p>
                            <button onclick="deleteMovie('${movie.id}')" class="btn-del"></button>
                        </div>
                    </div>
                    `
        }else{
            html += `
                    <div id="output" class="output">
                        <div class="output-elements">
                            <input onclick="completemovie('${movie.id}')" class="checkbox checkbox-checked" type="checkbox" name="" id="cb" />
                            <p class="movie-to-watch movie-to-watch-checked">${movie.text}</p>
                            <button onclick="deleteMovie('${movie.id}')" class="btn-del"></button>
                        </div>
                    </div>
                    `
        }
        
    })

    output.innerHTML = html;
}

function getDate() {
    let month = ["января", "февраля", "марта", "апреля",
        "мая", "июня", "июля", "августа",
        "сентября", "октября", "ноября", "декабря"];

    let date = new Date();
    let dateMonth = month[date.getMonth()];
    let dateTime = `${date.getHours()}:${date.getMinutes()} `;

    return `${date.getDate()} ${dateMonth} ${dateTime}`;
}

// LOCALSTORAGE FUNCTIONS

function localStoragedeleteMovie (id) {
    Object.keys(localStorage).forEach(key => {
        if (key === id) {
            localStorage.removeItem(key);
        }
    })
}

function localStorageCompletemovie (id) {
    const itemToComplete = JSON.parse(localStorage.getItem(id));

    if (itemToComplete) {
        itemToComplete.isWatched = !itemToComplete.isWatched;

        localStorage.setItem(`${id}`, JSON.stringify(itemToComplete));
    }
}

// LISTENERS

document.addEventListener('DOMContentLoaded', loadList);

document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        let text = input.value;
        let isTextEmpty = input.value.trim();

        if(isTextEmpty){
            createMovie(text);
            input.value = '';
            
        }else{
            alert('Nothing to add')
            input.value = '';
        }
    }
});

addMovie.addEventListener('click', function() {
    let isTextEmpty = input.value.trim();

    if(isTextEmpty){
        let text = input.value;

        createMovie(text);
        input.value = '';
    }else{
        alert('Nothing to add');
        input.value = '';
    }
})





