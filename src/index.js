const imageUrl = "http://localhost:3000/image"
let coderDog;

document.addEventListener('DOMContentLoaded', () => {
    updateImage()
});

function updateImage() {
    fetch(imageUrl)
        .then(resp => resp.json())
        .then(json => {
            coderDog = json;
            displayDog();       
        });    
};

function displayDog(){    
    // console.table(coderDog);

    document.querySelector('h2.title').innerText = coderDog.title;
    document.querySelector('img.image').src = coderDog.image;
    document.querySelector('span.likes').innerText = `${coderDog.likes} likes`;
    
    const commentsList = document.querySelector('ul.comments')
    commentsList.innerHTML = ''

    coderDog.comments.forEach(comment => {
        let li = document.createElement('li');
        li.innerText = comment.content;
        commentsList.append(li);
    });
};


/* Core Deliverables
As a user, I can:

See the image received from the server, including its likes and comments when the page loads
Click on the heart icon to increase image likes, and still see them when I reload the page
Add a comment (no persistence needed) 

Advanced Deliverables

As a user, I can:

Still see the comments written after reloading the page
Downvote an image
Delete a comment*/