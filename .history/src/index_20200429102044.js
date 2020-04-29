let comments = [];
let url = "http://localhost:3000/image"

document.addEventListener('DOMContentLoaded', () => {
    let doggo = fetch(url)
    .then(resp => resp.json())
    .then(json => console.log(json))

    let fgImage = document.querySelector(".image")
    fgImage.setAttribute('src', )
});