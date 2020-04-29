const imageUrl = "http://localhost:3000/image";
let coderDog;
const commentsList = document.querySelector('ul.comments');

document.addEventListener('DOMContentLoaded', () => {
    updateImage();
    addLike();
    addComment();
    addDeleteButtonToNakedEl();
});

// helpers
function updateImage() {
    fetch(imageUrl)
        .then(resp => resp.json())
        .then(json => {
            coderDog = json;
            displayDog();
        });
};

function displayDog() {
    // console.table(coderDog);

    document.querySelector('h2.title').innerText = coderDog.title;
    document.querySelector('img.image').src = coderDog.image;
    document.querySelector('span.likes').innerText = `${coderDog.likes} likes`;

    // see top for commentList assignment
    commentsList.innerHTML = ''

    coderDog.comments.forEach(comment => {
        let li = document.createElement('li');
        li.innerText = comment.content;
        commentsList.append(li);
    });
};

function addLike() {
    const likeButton = document.querySelector("button.like-button");
    likeButton.addEventListener('click', (event) => {
        coderDog.likes++;
        displayDog();

        fetch(imageUrl, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                likes: coderDog.likes
            })
        });
    });
};

function addComment() {
    const commentForm = document.querySelector('form.comment-form');
    commentForm.addEventListener('submit', (event) => {
        const li = document.createElement('li');
        li.innerText = event.target.firstElementChild.value;
        let delbutton = createDeleteButton();
        li.append(delbutton)
        commentsList.append(li);
        event.target.firstElementChild.value = '';
        event.preventDefault();

        addCommentObjToCoderDog();
        fetch(imageUrl, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                comments: coderDog.comments
            })
        });

    });
};

function addCommentObjToCoderDog() {
    let lastId = coderDog.comments[coderDog.comments.length - 1].id
    coderDog.comments.push({
        id: lastId + 1,
        content: commentsList.lastElementChild.innerText
    });
};

function createDeleteButton() {
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete-button');
    return deleteButton;
};

// function addDeleteButtonToNakedEl () {
//     for (const li of commentsList.children) {
//         if (li.children.length > 0) {
//             let delbutton = createDeleteButton();
//             li.append(delbutton);
//         }
//     };
// };
/*
Advanced Deliverables

As a user, I can:

Still see the comments written after reloading the page
Downvote an image
Delete a comment*/