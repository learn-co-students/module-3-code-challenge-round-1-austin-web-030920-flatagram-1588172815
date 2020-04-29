
const imageDiv = () => document.querySelector(".image-card")

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector(".like-button").addEventListener("click", likeImage);
    const form = document.querySelector(".comment-form")
    const comments = imageDiv().querySelector(".comments")
    form.addEventListener('submit', addComment);

    function addComment(event) {
        let newComment = document.querySelector(".comment-input").value
        comments.innerHTML += `<li>${newComment}</li>`
        event.preventDefault();
    }

    fetchImage("http://localhost:3000/image")

    function fetchImage(url) {
        fetch(url)
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            displayImage(json);
        });
    }

    function displayImage(json) {

        imageDiv().querySelector(".title").textContent = json.title
        imageDiv().querySelector(".image").src = json.image
        imageDiv().querySelector(".likes").textContent = `${json.likes} likes`
        for(const key of json.comments) {
            comments.innerHTML += `<li> ${key.content} </li>`
        }
    }

    function likeImage(event) {
        

        let likes = imageDiv().querySelector(".likes")

        likesNum = parseInt(likes.textContent.substr(0, likes.textContent.indexOf(' ')))
        likesNum++
        likes.textContent = `${likesNum} likes`

        patchNewLike(likesNum)
    }

    function patchNewLike(likesNum) {
        let configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            likes: likesNum
          })
        }
    
        fetch(`http://localhost:3000/image`, configObj)
        .then(function(response) {
          return response.json();
        })
        .catch(function(error) {
          alert(error.message)
        })
      }


});