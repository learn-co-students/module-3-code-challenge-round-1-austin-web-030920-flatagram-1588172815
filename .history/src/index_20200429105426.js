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
    postLikes = document.querySelector(".likes");
    likeCount = parseInt(postLikes.innerText);
    likeCount++
    // console.log(likeCount);
    postLikes.innerText = `${likeCount} likes`;
    console.log(postLikes)

    fetch(url, {
        method: "PATCH",
        headers: {
            'Content-Type': "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(image.likes)
    });
}