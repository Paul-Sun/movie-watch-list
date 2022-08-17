let watchList = JSON.parse(localStorage.getItem("myWatchList"))

function renderFilmContent(data){
    if(data == undefined || data.length == 0){
        document.getElementById("main-container").innerHTML = 
        `<h5 class="text-no-result" >Your watchlist is looking a little empty...</h5>
          <div class="add-movie-msg"><img class = "icon-img" src="images/icon-add.png">
          <h5>Let’s add some movies!</h5></div>
        `
    }else{
        let html = ""
        for(let i=0;i<data.length; i++){
            html += `<br><div class="movie-container">
            <img class = "poster-img" src="${data[i].Poster}">
            <div class = "movie-detail-container">
                <div class="movie-detail">
                    <h4>${data[i].Title}</h4>
                    <img class = "icon-img" src="images/icon-star.png">
                    <p>${data[i].imdbRating}</p>
                </div>
                <div class="movie-detail">
                    <p>${data[i].Runtime}</p><p>${data[i].Genre}</p>
                    <img class = "icon-img" src="images/icon-remove.png">
                    <button id="${i}" class="remove-btn" 
                    onclick="removeMovie(this.id)">Remove</button>
                </div>
                <div class="movie-detail">
                    <p>${data[i].Plot}</p>
                </div>
                </div>
            </div><br><hr>`
            }
            document.getElementById("main-container").innerHTML = html
    }
}

renderFilmContent(watchList)

function removeMovie(clickID) {    
    let newWatchlist = JSON.parse(localStorage.getItem("myWatchList"))   
    newWatchlist.splice(clickID, 1)
    localStorage.setItem("myWatchList", JSON.stringify(newWatchlist))
    renderFilmContent(newWatchlist)    
}