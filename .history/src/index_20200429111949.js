let url = "http://localhost:3000/image"
let comments = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch(url)
    .then(resp => resp.json())
    .then(json => renderFGP(json))
});

function renderFGP(json) {
    let fgImage = document.querySelector(".image");
    let likeButton = document.querySelector(".like-button");
    let addComment = document.querySelector(".comment-form");

    fgImage.setAttribute('src', json.image);
    
    likeButton.addEventListener('click', likePost);
    addComment.addEventListener('submit', postComment);


}

function likePost(event) {
    console.log(event.target);
    likes = document.querySelector(".likes");
    likeCount = parseInt(likes.innerText);
    likeCount++
    // console.log(likeCount);
    likes.innerText = `${likeCount} likes`;
    console.log(likes)

    fetch(url, {
        method: "PATCH",
        headers: {
            'Content-Type': "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            likes: likes 
        })
    });
}

function postComment(event) {
    event.preventDefault();
    comment.push(document.querySelector('.comment-input').value);
    renderComments();
    // comment.innerText = ''
}

function renderComments