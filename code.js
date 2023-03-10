const inputNameMovie = document.querySelector(".inputNameMovie");
const listSearch = document.querySelector(".list-search");

const viewData = document.querySelector(".section");


async function searchMovie(charSearch){
    let data = await fetch(`https://www.omdbapi.com/?s=${charSearch}&page=1&apikey=c366f511`)
    let dataJson = await data.json();
    if(dataJson.Response == "True") showListMovie(dataJson.Search);
}

function findMovie(){
    let charSearch = (inputNameMovie.value).trim();
    if(charSearch.length > 0){
        listSearch.innerHTML = "";
        listSearch.style.display = "block";
        searchMovie(charSearch)
    }else listSearch.style.display = "none";
}
function showListMovie(listMovie){
    let img;
    for(let i = 0; i < listMovie.length; i++){
        const div = document.createElement("div");
        div.classList.add("container-search-movie");
        if(listMovie[i].Poster == "N/A")img="not-found.jpg"
        else img = `${listMovie[i].Poster}`;
        div.innerHTML = `
            <div class="container-poster-search-movie">
                <img class="poster-search" src="${img}">
            </div>
            <div class="info-search-movie">
                <h1 class="title-search-movie">${listMovie[i].Title}</h1>
                <div class="year-search-movie">${listMovie[i].Year}</div>
            </div>`;
        div.dataset.id = listMovie[i].imdbID;
        listSearch.appendChild(div);
    }
    loadEventDiv();
}
/*https://www.omdbapi.com/?i=${id}&apikey=c366f511*/

const searchMovieId = async(id)=>{
    let img;
    listSearch.style.display = "none";
    viewData.style.display = "flex";
    let data = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=c366f511`)
    let dataJson = await data.json();
    if(dataJson.Poster == "N/A")img = `not-found.jpg`;
    else img = `${dataJson.Poster}`;
    console.log(dataJson);
    if(dataJson.Response == "True"){
        viewData.innerHTML=`
        <div class="container-poster">
            <img src="${img}" class="poster-movie"> 
        </div>
        <div class="container-data">
            <h1>${dataJson.Title}</h1>
            <div><span class="tinte-letras">Año: </span>${dataJson.Year}</div>
            <div><span class="tinte-letras">Clasificación: </span>${dataJson.Rated}</div>
            <div><span class="tinte-letras">Estreno: </span>${dataJson.Released}</div>
            <div><span class="tinte-letras">Director: </span>${dataJson.Director}</div>
            <div><span class="tinte-letras">Escritores: </span>${dataJson.Writer}</div>
            <div><span class="tinte-letras">Actores: </span>${dataJson.Actors}</div>
            <div><span class="tinte-letras">Sinopsis: </span>${dataJson.Plot}</div>
        </div>`;
    };

}

function loadEventDiv(){
    const list = document.querySelectorAll(".container-search-movie");
    list.forEach(element =>{
        element.addEventListener("click",()=>{
            searchMovieId(element.dataset.id);
        });
    });
}