const url = 'http://localhost:3000/image'
let image = {};

document.addEventListener('DOMContentLoaded', init);

const setImage = img => {
    image = img;
    renderImageCard(image);
}

const getImage = async () => {
    const resp = await fetch(url);
    return await resp.json();
    // return await (await fetch(url)).json()
}

const deleteComment = (id) => {
    // get comment by id in comments
    // find index of that element

    image.comments = image.comments.filter(comment => (comment.id != id) );

    renderImageCard(image);

    // persist that shiz
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({comments: image.comments})
    });
}

const addComment = content => {
    let id = image.comments.length + 1;

    image.comments.push({
        id: id,
        content: content
    })

    renderImageCard(image);

    // persist that shiz
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({comments: image.comments})
    });
}

const renderImageCard = (img) => {
    // title
    let title = document.querySelector('.title');
    title.innerText = img.title;

    // image
    let imageEl = document.querySelector('.image');
    imageEl.setAttribute('src', img.image);

    // likes
    let likes = document.querySelector('.likes');
    likes.innerText = `${img.likes} likes`;

    // comments
    let comments = document.querySelector('ul.comments');
    comments.innerHTML = ''; // clear out the comment section

    // append a list element for each comment
    img.comments.forEach(comment => {
        let li = document.createElement('li');
        let btn = document.createElement('i');
        btn.className = 'delete-comment-button';
        btn.innerText = 'x'
        btn.dataset.commentId = comment.id;
        btn.addEventListener('click', handleDeleteComment);
        li.append(comment.content);
        li.append(btn);

        comments.appendChild(li);
    });
}

const setLikes = (likes) => {
    image.likes = likes;
    renderImageCard(image);
    
    // send PATCH request to server
    // care not about the response, weary traveler
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({likes: image.likes})
    });

}
// event handlers
const handleLike = (event) => {
    // increment image likes
    setLikes(image.likes + 1)
}

const handleDislike = (event) => {
    // decrement image likes
    if (parseInt(image.likes) > 0) {
        setLikes(image.likes - 1)
    }
}

const handleAddComment = (event) => {
    event.preventDefault();
    let commentEl = event.target.parentElement.querySelector('.comment-input')
    let comment = commentEl.value;
    commentEl.value = '';
    addComment(comment);
}
const handleDeleteComment = (event) => {
    let commentId = event.target.dataset.commentId;

    deleteComment(commentId);
}


let dislikeButton = document.querySelector('.dislike-button');
dislikeButton.addEventListener('click', handleDislike);

let likeButton = document.querySelector('.like-button');
likeButton.addEventListener('click', handleLike);

let commentButton = document.querySelector('.comment-button');
commentButton.addEventListener('click', handleAddComment);



async function init() {
    let img = await getImage();

    setImage(img);
}