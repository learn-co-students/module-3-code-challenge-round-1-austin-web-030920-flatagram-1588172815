let comments = [];
let url = "http://localhost:3000/image"

document.addEventListener('DOMContentLoaded', () => {
    fetch(url)
    .then(resp => resp.json())
    .then(json => renderFGP(json))
});

function renderFGP(json) {
    let fgImage = document.querySelector(".image")
    fgImage.setAttribute('src', doggo.image)
}