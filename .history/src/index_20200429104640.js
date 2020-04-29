let comments = [];
let url = "http://localhost:3000/image"

document.addEventListener('DOMContentLoaded', () => {
    fetch(url)
    .then(resp => resp.json())
    .then(json => renderFGP(json))
});

function renderFGP(json) {
    let fgImage = document.querySelector(".image");
    let likeButton = document.querySelector(".like-button");

    fgImage.setAttribute('src', json.image)
    
    likeButton.addEventListener('click', likePost)
}

function likePost(event) {
    console.log(event.target);
    post = event.target.parent
    likes = document.querySelector(".likes");
    console.log(likes)
    likeCount = parseInt(likes.innerText);
    likeCount++
    // console.log(likeCount);
    likes.innerText = `${likeCount} likes`;

    fetch(url, {
        method: "PATCH",
        headers: {
            'Content-Type': "application/json",
            "Accept": "application/json"
        },
        body: likes
    });
}