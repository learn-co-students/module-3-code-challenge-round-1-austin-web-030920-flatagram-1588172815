// write your code here



const url = "http://localhost:3000/image"

// const imageDiv = document.querySelector('image-card');
// const likeDiv = document.querySelector('likes-section');
// const title = document.querySelector('title');
// const commentDiv = document.querySelector('comments');
// const commentSubmit = document.querySelector('comment-form');
let pic;

document.addEventListener  ('DOMContentLoaded', () =>{
    fetchPic();
})

function fetchPic(){
    fetch(url)
    .then(response => response.json())
    .then(json => {
        pic = json;
        renderPic(json)
    })
}


function renderPic(json){
    console.log(json)

    let title = document.getElementById('title');
    title.innerHtml = pic.title;

    // let image = document.getElementById('image');
    // image.src = pic.image;



}