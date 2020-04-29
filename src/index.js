let url = "http://localhost:3000/image"
let comments = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch(url)
    .then(resp => resp.json())
    .then(json => {
        comments = json.comments
        renderFGP(json)
    });
});

function renderFGP(json) {
    let fgImage = document.querySelector(".image");
    let likeButton = document.querySelector(".like-button");
    let addComment = document.querySelector(".comment-form");
    let fgLikes = document.querySelector(".likes");
    let fgTitle = document.querySelector(".title");

    renderComments();
    

    fgLikes.innerText = `${json.likes} likes`
    fgTitle.innerText = json.title
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
        let idCounter = 1
        let newComment = document.createElement('li');
        let deleteBtn = document.createElement('span');
        newComment.innerText = comment;
        newComment.dataset.id = idCounter
        idCounter++
        allComments.appendChild(newComment);

        deleteBtn.innerText = "    [Delete Comment]"
        newComment.appendChild(deleteBtn);

        deleteBtn.dataset.id = newComment.dataset.id
        deleteBtn.addEventListener('click', () => {
            console.log('test');
            commentToDel = comments.find(comment => deleteBtn.dataset.id === comment.dataset.id)
            console.log(commentToDel);
        })
    });
}