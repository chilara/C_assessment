let url_string = window.location.href;

// convert to js representation of url
let url = new URL(url_string);
const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";

const get_id = () => {
  return url.searchParams.get("id");
};

const getSingleNews = async (id) => {
  try {
    const response = await fetch(`${base_url}/news/${id}`);
    const newsData = await response.json();
    await getComments(id);
    displayNewsDetails(newsData);
  } catch (error) {
    console.log(error);
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
  const comments = data.map((item) => `<li>${item.comment}</li>`);
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
};

window.onload = getSingleNews(get_id());
