// write your code here
//See the image received from the server, including its likes and comments when the page loads
let dogInfo = [];
const imgTitle = document.querySelector('.title');
const imgPoster = document.querySelector(".image");
const imgLikes = document.querySelector(".likes");
const imgComments = document.querySelector(".comments");
const likeButton = document.querySelector("button");
const postBtn = document.querySelector(".comment-button")
const url = 'http://localhost:3000/image';

document.addEventListener('DOMContentLoaded', () =>{
    fetch(url)
    .then(res => res.json())
    .then(res =>{
        dogInfo = res,
        viewDog()
    });
});

function viewDog(){
    imgTitle.innerText = dogInfo.title;
    imgPoster.src = dogInfo.image;
    imgLikes.innerText = `${dogInfo.likes} likes`;
    dogInfo.comments.forEach(comment =>(renderComments(comment)))
}

function renderComments(comment){
    const ul = document.createElement("li");
    //console.log(comment)
    ul.innerText = comment.content;
    imgComments.appendChild(ul);
}

// Click on the heart icon to increase image likes, 
// and still see them when I reload the page
likeButton.addEventListener('click', addLikes);

function addLikes(e){
    //console.log(e.target.value);
    if (e.target)
    imgLikes.innerText = `${dogInfo.likes +=1} likes` 

 // BELOW NOT FINISHED
    fetch(url, {
        method: 'PATCH', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            likes: dogInfo.likes
        }),
    })
}

postBtn.addEventListener("click", addComment)

function addComment(e){
    e.preventDefault()
    console.log(e.target)
}

