// write your code here
// 1. See image incl likes and comments
// 2. Click heart to increase like count, persist to db
// 3. Add comment, no persist
//  ----- stretch ------
// 4. Persist comments
// 5. Downvote
// 6. Delete comment

const URL = 'http://localhost:3000/image';
const cardTitle = document.querySelector('h2');
const cardImage = document.querySelector('.image');
const cardLikes = document.querySelector('.likes');
const likeButton = document.querySelector('.like-button');
const cardComments = document.querySelector('.comments');
const commentForm = document.querySelector('form');
let flatPost;

document.addEventListener('DOMContentLoaded', () => {
    fetchImage();
    likeButton.addEventListener('click', addLike)
    // commentForm.addEventListener('submit', addComment)
})

function fetchImage() {
    fetch(URL)
    .then(response => response.json())
    .then(json => {
        flatPost = json;
        console.log(json)
        renderImage();
        })
}

function renderImage() {
    cardTitle.innerText = flatPost.title;
    cardImage.src = flatPost.image;
    cardLikes.innerText = flatPost.likes;
    cardComments.innerHTML = renderComments();
}

function addLike() {
    flatPost.likes += 1;
    renderImage();
    fetch(URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ likes: flatPost.likes })
    });
}

function addComment() {

}

function renderComments() {
    for(let i = 0; i <= flatPost.comments.length; i++) {
        let comLi = document.createElement('li')
        comLi.innerText = flatPost.comments[i].content
        cardComments.appendChild(comLi)

    }
    // flatPost.comments.forEach(el => {
    // })
    renderImage();
}

