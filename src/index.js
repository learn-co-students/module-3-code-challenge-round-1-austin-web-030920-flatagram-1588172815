// === NOTES ===
        // this preventDefault will be the end of me

// === GLOBAL CONSTANTS ===
const url = "http://localhost:3000/image"
const commentsDiv = document.querySelector('ul.comments')
const likeBtn = document.querySelector('button.like-button')
const cmntSubmit = document.querySelector('form.comment-form')
const textCntnt = document.querySelector('input.comment-input')
let newLikes;
let coderDog;

// === DOM CONTENT LOADED ===
document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    doggoLikes()
    doggoComments()
    fetchDog()
  });

// === FETCH ===
function fetchDog(){
    fetch(url).then(r => r.json()).then(dog => dogInfo(dog))
};

function fetchPatchLikes(newLikes){
    let like = parseInt(newLikes)
    console.log(like)
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({likes: like})
    })
};

// === Helper Methods ===

function dogInfo(dog) {
    coderDog = dog

    let imgHolder = document.querySelector('img.image');
    imgHolder.src = dog.image

    let dogTitle = document.querySelector('h2.title')
    dogTitle.innerText = dog.title

    let dogLikes = document.querySelector('span.likes')
    dogLikes.innerText = `${dog.likes} likes`

    rmvLis(), rmvLis(), rmvLis()
    populateComments()
};

// remove placeholder lis
function rmvLis() {
    let commentsLi1 = document.querySelectorAll('li')[0]
    commentsLi1.remove()
};

// populate comments from db
function populateComments(){
    crntComments = coderDog.comments
    crntComments.forEach((cmnt) => {
        let newLi = document.createElement('li')
        newLi.innerText = cmnt.content
        commentsDiv.appendChild(newLi)
    });
};
 
// listen to heart, update dom, send to fetch
function doggoLikes(){
    likeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dogLikes = document.querySelector('span.likes')
        let newL = coderDog.likes++
        newLikes = newL + 1
        dogLikes.innerText = `${newLikes} likes`
        fetchPatchLikes(newLikes) 
    });
};

// listen to comments
function doggoComments(){
    cmntSubmit.addEventListener('submit', (e) => {
        e.preventDefault();
        let cmnt = e.target[0].value
        let newLi = document.createElement('li')
        newLi.innerText = cmnt
        commentsDiv.appendChild(newLi)
      })
};