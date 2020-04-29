// write your code here
document.addEventListener('DOMContentLoaded', () => {

    const url = 'http://localhost:3000/image'

    const title = document.querySelector('.title')
    const dogImage = document.querySelector('.image')
    const likes = document.querySelector('.likes')
    const imageComments = document.querySelector('.comments')
    const addComment = document.querySelector('.comment-form')
    addComment.addEventListener('submit', addNewComment)

    fetch(url)
        .then(r => r.json())
        .then(json => renderImage(json))

    function renderImage(json) {
        //console.log(json.comments)
        title.innerText = json.title
        dogImage.src = json.image
        likes.innerText = json.likes
        imageComments.innerHTML = ''

        json.comments.forEach(comment => {
            const commentLi = document.createElement('li')
            commentLi.innerText = comment.content
            imageComments.append(commentLi)
        })
        const likeButton = document.querySelector('.like-button')
        likeButton.addEventListener('click', increaseLikes)
    }

    function increaseLikes(event) {
        //console.log(event)
        const countLikes = parseInt(likes.innerHTML)
        likes.innerHTML = countLikes + 1

        fetch(url, {
            method: "PATCH",
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ likes: countLikes +1})
        })

    }
    function addNewComment(event) {
        event.preventDefault()
        const commentInput = document.createElement('li')
        commentInput.innerText = event.target.comment.value
        imageComments.appendChild(commentInput)
    }
})



