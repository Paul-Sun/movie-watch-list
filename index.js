const searchInput = document.getElementById("search-input")
//let currentMovie ={}
let myMovies = []
document.getElementById("search-btn").addEventListener("click", function(e){
    e.preventDefault()
  //  console.log(searchInput.value)
    fetch(`https://www.omdbapi.com/?t=${searchInput.value}&apikey=cef19669`)
        .then (res => res.json())
        .then (data => {         
            if(data.Response.toUpperCase() == "TRUE"){
                console.log(data)
                renderFilmContent(data)
                
                document.getElementById("add-btn").addEventListener("click", function()
                    {
                        let watchlistString = localStorage.getItem("myWatchList")
                        console.log(watchlistString)
                        if (watchlistString == ""){
                            myMovies.push(data)                        
                            localStorage.setItem("myWatchList", JSON.stringify(myMovies))  
                            console.log(myMovies)
                        }else{
                            let watchlist = JSON.parse(watchlistString)
                            if(!isItemInObjectArray(data.Title, watchlist)){
                                watchlist.push(data)
                                localStorage.setItem("myWatchList", JSON.stringify(watchlist)) 
                            }
                       
                        }
                    })  
                
                
            }
            else {
                console.log("no film found")
                document.getElementById("main-container").innerHTML =
                `<h5 class="text-no-result" >Unable to find what you’re looking for. 
                Please try another search.</h5>`
                }
            
            })
})

function renderFilmContent(data){
    document.getElementById("main-container").innerHTML =
    `<div class="movie-container">
        <img class = "poster-img" src="${data.Poster}">
        <div class = "movie-detail-container">
            <div class="movie-detail">
                <h4>${data.Title}</h4>
                <img class = "icon-img" src="images/icon-star.png">
                <p>${data.imdbRating}</p>
            </div>
            <div class="movie-detail">
                <p>${data.Runtime}</p><p>${data.Genre}</p>
                <img class = "icon-img" src="images/icon-add.png">
                <button id="add-btn">Watchlist</button>
            </div>
            <div class="movie-detail">
                <p>${data.Plot}</p>
            </div>
        </div>
    </div>`
}

function isItemInObjectArray(item, arr){
    for(let i=0; i < arr.length; i++){
        if(item == arr[i].Title){
            return true
        }         
    }
    return false
}


