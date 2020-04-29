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
    let fgLikes = document.querySelector(".likes")
    let fgComments = document.querySelector(".comments")

    fgLikes.innerText = `${json.likes} likes`


    fgImage.setAttribute('src', json.image);
    
    likeButton.addEventListener('click', likePost);
    addComment.addEventListener('submit', postComment);


}

function likePost(event) {
    console.log(event.target);
    likes = document.querySelector(".likes");
    let likeCount = parseInt(likes.innerText);
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
            likes: likeCount
        })
    });
}

function postComment(event) {
    event.preventDefault();
    comments.push(document.querySelector('.comment-input').value);
    console.log(comments);

    renderComments();
    // comment.innerText = ''
    fetch(url, {
        method: "PATCH",
        headers: {
            'Content-Type': "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            comments: comments
        })
    })
}

function renderComments() {
    let allComments = document.querySelector('.comments');
    allComments.innerText = ''
    comments.forEach(comment => {
        let newComment = document.createElement('li');
        newComment.innerText = comment;
        allComments.appendChild(newComment);
    });
}