let comments = [];
let url = "http://localhost:3000/image"

document.addEventListener('DOMContentLoaded', () => {
    fetch(url)
    .then(resp => resp.json())
    .then(json => renderFGP(json))
});

function renderFGP(json) {
    let fgImage = document.querySelector(".image")
    let likeButton = document.querySelector(".like-button")

    fgImage.setAttribute('src', json.image)
    
}