const searchInput = document.getElementById("search-input")
searchInput.addEventListener("keyup", function(event) {
    event.preventDefault()
    if (event.keyCode === 13) {
        document.getElementById("search-btn").click()
    }
})

let movieDetailArr = []
document.getElementById("search-btn").addEventListener("click", function(e){
    e.preventDefault()
    fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=cef19669`)
        .then (res => res.json())
        .then (data => {         
            if(data.Response.toUpperCase() == "TRUE"){
               let movieArr = data.Search
               movieDetailArr = []
                for(let i=0; i < movieArr.length; i++){
                    fetch(`https://www.omdbapi.com/?i=${movieArr[i].imdbID}&plot=full&apikey=cef19669`)
                    .then(res => res.json())
                    .then(data =>{ 
                        movieDetailArr.push(data)
                        renderMovies(movieDetailArr) 
                        })                               
                }
            }
            else {
                document.getElementById("main-container").innerHTML =
                `<h5 class="text-no-result" >Unable to find what you’re looking for. 
                Please try another search.</h5>`
                }
            
            })
})

function renderMovies(data){
    html = ""
    for(let i=0; i< data.length; i++){
        html += `<div class="movie-container">
        <img class = "poster-img" src="${data[i].Poster}">
        <div class = "movie-detail-container">
            <div class="movie-detail">
                <h4>${data[i].Title}</h4>
                <img class = "icon-img" src="images/icon-star.png">
                <p>${data[i].imdbRating}</p>
            </div>
            <div class="movie-detail">
                <p>${data[i].Runtime}</p><p>${data[i].Genre}</p>
                <img class = "icon-img" src="images/icon-add.png">
                <button class="add-btn" id="${data[i].imdbID}" onclick ="addMovie(this.id, event)">Watchlist</button>
            </div>
            <div class="movie-detail">
                <p>${data[i].Plot}</p>
            </div>
        </div>
    </div><br><hr>`
    }
    document.getElementById("main-container").innerHTML = html
    
}

function addMovie(movieId, event){
    let watchlist = JSON.parse(localStorage.getItem("myWatchList"))   
    if(watchlist[0] === null) {watchlist = []}   
    if(!isItemInObjectArray(movieId, watchlist)){
        let data = movieDetailArr.find( (item) => item.imdbID == movieId )
        watchlist.push(data)
        localStorage.setItem("myWatchList", JSON.stringify(watchlist)) 
        let btn = event.target
        btn.textContent = "Added"
        btn.style.color= "green"
        btn.disabled = true;
    }
}

function isItemInObjectArray(movieId, arr){
    if(arr == null || arr.length == 0) {
        return false}
    else {
        for(let i=0; i < arr.length; i++){
            if(movieId == arr[i].imdbID){
                return true
            }         
        }
        return false
    }
}


