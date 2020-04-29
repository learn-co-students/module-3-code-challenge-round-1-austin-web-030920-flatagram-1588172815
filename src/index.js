document.addEventListener("DOMContentLoaded", () => {
    const URL = 'http://localhost:3000/image'

    const likeButton = document.querySelector(".like-button")
    likeButton.addEventListener("click", likePost)
    fetch(URL)
    .then(rsp => rsp.json())
    .then((json) => displayPost(json))
})

function displayPost(json) {
    const image = document.getElementById("image")
    image.innerHTML = json.image
    // image isn't working--might be url? works when i set the image equal to something else in the console... so idk?!
    const likes = document.querySelector(".likes")
    likes.innerHTML = `${json.likes} likes`
    const title = document.querySelector(".title")
    title.innerHTML = json.title
    // const commentList = document.querySelector(".comments")
    // commentList.innerHTML = json.comments.forEach(comment => {
    //     comment.content
    // });
// this works (but i can't get it to let me somehow set the innerhtml to this??)
    // comms = json.comments
    // index = 0
    // while(index < comms.length) {comms[index].content; index+=1}
    // maybe i have to do some sort of like.... create a list? come back to this later.
}

function likePost(event) {
    console.log("hey, clicking the like button does something!")
    // we need to add 1 to the json.likes and make it persist--how do we reach that json? refetch? patchhhhh~!?? okay let's try it

    // definitely a patch, but definitely missing something here, too.


    //#LIKES++
    // fetch("http://localhost:3000/image", {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //     },
    //     method: 'PATCH',
    //     body: JSON.stringify({ #LIKES }),
    //  })
    
}


