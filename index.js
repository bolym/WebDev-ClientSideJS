/*
 * Add your JavaScript to this file to complete the assignment.
 */

document.getElementById("create-twit-button").addEventListener("click", openModal);
document.getElementsByClassName("modal-close-button")[0].addEventListener("click", closeModal);
document.getElementsByClassName("modal-cancel-button")[0].addEventListener("click", closeModal);
document.getElementsByClassName("modal-accept-button")[0].addEventListener("click", checkFields);
document.getElementById("navbar-search-button").addEventListener("click", searchTwits);
document.getElementById("navbar-search-input").addEventListener("input", searchTwits);

function openModal() {
  var modal = document.getElementById("create-twit-modal");
  var backdrop = document.getElementById("modal-backdrop");
  modal.style.display = "block";
  backdrop.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("create-twit-modal");
  var backdrop = document.getElementById("modal-backdrop");
  modal.style.display = "none";
  backdrop.style.display = "none";
  var twitText = document.getElementById("twit-text-input");
  var author = document.getElementById("twit-attribution-input");
  twitText.value = "";
  author.value = "";
}

function checkFields(){
  var text = document.getElementById("twit-text-input").value;
  var author = document.getElementById("twit-attribution-input").value;

  if(text === "" || author === ""){
    alert("You must enter both text and author to create a Twit.");
  } else {
    addTwit(text, author);
  }
}

var liveTwits = document.getElementsByClassName("twit");
var allTwits = [];
for(var i = 0; i < liveTwits.length; i++){
  allTwits.push(liveTwits[i]);
}

function addTwit(text, author) {

  var twitContainer = document.getElementsByClassName("twit-container")[0];
  var twitArticle = document.createElement("article");
  twitArticle.classList.add("twit");

  var twitIconDiv = document.createElement("div");
  twitIconDiv.classList.add("twit-icon");
  twitArticle.appendChild(twitIconDiv);

  var twitImage = document.createElement("i");
  twitImage.classList.add("fas");
  twitImage.classList.add("fa-bullhorn");
  twitIconDiv.appendChild(twitImage);

  var twitContentDiv = document.createElement("div");
  twitContentDiv.classList.add("twit-content");
  twitArticle.appendChild(twitContentDiv);

  var twitText = document.createElement("p");
  twitText.classList.add("twit-text");
  twitText.textContent = text;
  twitContentDiv.appendChild(twitText);

  var twitAuthor = document.createElement("p");
  twitAuthor.classList.add("twit-author");
  twitContentDiv.appendChild(twitAuthor);

  var twitAuthorLink = document.createElement("a");
  twitAuthorLink.setAttribute("href", "#");
  twitAuthorLink.textContent = author;
  twitAuthor.appendChild(twitAuthorLink);

  twitContainer.appendChild(twitArticle);
  allTwits.push(twitArticle);

  closeModal();
}


function resetDOM() {
  for(var i = liveTwits.length - 1; i >=0; i--){
    liveTwits[i].remove();
  }

  var twitContainer = document.getElementsByClassName("twit-container")[0];
  for(var i = 0; i < allTwits.length; i++){
    twitContainer.appendChild(allTwits[i]);
  }
}

function searchTwits() {
  resetDOM();

  var searchInput = document.getElementById("navbar-search-input").value.toLowerCase();

  for(var i = allTwits.length - 1; i >= 0; i--){
    var twitContent = allTwits[i].children[1].children[0].textContent.toLowerCase();
    var twitAuthor = allTwits[i].children[1].children[1].textContent.toLowerCase();

    if(twitContent.search(searchInput) === -1 && twitAuthor.search(searchInput) === -1){
      liveTwits[i].remove();
    }
  }
}
