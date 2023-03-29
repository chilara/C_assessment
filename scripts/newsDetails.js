let divider = document.getElementById("divider");
let add = document.getElementById("add");
let edit = document.getElementById("edit");
let del = document.getElementById("del");
let url_string = window.location.href;
let loadingDiv = document.getElementById("loadingStatus");
let jumbotron = document.getElementById("jumbotron");

// convert to js representation of url  and extracting the param from the url
let url = new URL(url_string);
const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";

const get_id = () => {
  return url.searchParams.get("id");
};

const getSingleNews = async (id) => {
  try {
    jumbotron.style.display = "none";
    divider.style.display = "none";
    loadingDiv.innerText = "Loading...";

    const response = await fetch(`${base_url}/news/${id}`);
    const newsData = await response.json();
    await getComments(id);
    displayNewsDetails(newsData);
  } catch (error) {
    console.log(error);
  } finally {
    divider.style.display = "block";
    loadingDiv.innerText = "";
    jumbotron.style.display = "block";
    divider.style.display = "flex";
    divider.style.justifyContent = "space-between";
  }
};

const displayNewsDetails = (data) => {
  let image = document.getElementById("img");
  let title = document.getElementById("title");
  let url = document.getElementById("url");
  let author = document.getElementById("author");

  image.src = data.avatar;
  title.innerText = data.title;
  author.innerText = `Published by ${data.author}`;
  url.innerText = data.url;
};

// displaying comments
const displayComments = (data) => {
  const ulTag = document.querySelector("#comments");
  const comments = data.map(
    (item) =>
      `
    <div style="display: flex; justify-content: space-between;">
    <li>${item.comment}</li>
    <div>
      <a href="" id="imgEdit" class="commentBtn">Edit</a>
      <a href="" id="del" style="background-color: red; color: #fff; cursor: pointer; border; none" class="commentBtn">Delete</a>
    </div>
    </div>
    `
  );
  ulTag.innerHTML = comments;
};

// getting comments
const getComments = async (id) => {
  const commentApi = `${base_url}/news/${id}/comments`;
  try {
    let response = await fetch(commentApi);
    response = await response.json();
    displayComments(response);
  } catch (error) {
    console.log(error);
  }

  // add comments
  add.innerText = "add";
  add.id = "imgAdd";
  const inputComment = document.getElementById("add");

  add.onclick = () => {
    try {
      loadingStatus.innerHTML = "<h5>Loading...</h5>";
      add.href = `./addComments.html?id=${get_id()}`;
    } catch (error) {
      console.log(error);
    }
  };
};

window.onload = getSingleNews(get_id());
