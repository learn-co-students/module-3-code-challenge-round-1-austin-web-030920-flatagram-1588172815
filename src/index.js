// write your code here
fetch("http://localhost:3000/image")
.then(resp => resp.json())
.then(json => dispalyImage(json));

imageFormContainer.addEventListener('submit', (event) => {
    event.preventDefault();
let image = event.target[0].value
let comment = event.target[1].value

fetch("http://localhost:3000/image"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "image": image_data.image.value,
      "comment": comment_data.comment.value,
      "likes": 0

    })
  }
  .then(resp => resp.json())
});

function displayImage(json) {
    let collection = document.getElementById('image-collection')
    json.forEach(image => {
        let card= createComment(image);
        collection.appendChild(card)
    });
}

function createComment(image) {
    const image = document.createElement('div');
    image.className = 'image';

    let imageLikes = document.createElement('p');
    imageLikes.innerHTML = `${image.likes} likes`;
    card.appendChild(imageLikes);

    let likeButton = document.createElement('button');
    likeButton.className = 'like-button';
    likeButton.innerHTML = '♥';
    likeButton.dataset.id = image.id
    likeButton.addEventListener('click',likeImage)
    card.appendChild(likeButton);

    let commentImage = document.createElement('p');
    commentImage.className = 'comment';
    commentImage.dataset.id = image.id

    return card;

    function newFunction() {
        return document.createElement('div');
    }
}
