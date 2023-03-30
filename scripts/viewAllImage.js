const loadingStatus = document.getElementById("loadingStatus");

let url_string = window.location.href;

// convert to js representation of url and extracting the param from the url
let url = new URL(url_string);
const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";

const get_id = () => {
  return url.searchParams.get("id");
};

let imgIndex = 1;

function incrementDivs(n) {
  displayDivs((imgIndex += n));
}

function displayDivs(n) {
  let i;
  let x = document.getElementsByClassName("article-imgs");
  if (n > x.length) {
    imgIndex = 1;
  }
  if (n < 1) {
    imgIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[imgIndex - 1].style.display = "block";
}

const articleId = get_id();

const getImageNews = async () => {
  try {
    loadingStatus.innerHTML = "<h5>Loading...</h5>";
    const response = await fetch(`${base_url}/news/${articleId}/images`);
    const data = await response.json();
    console.log(data);
    displayImages(data);
    displayDivs(imgIndex);
  } catch (error) {
    console.log(error);
  } finally {
    loadingStatus.innerHTML = "";
  }
};

const displayImages = (data) => {
  data.map((item) => {
    let articleContainer = document.getElementById("articleContainer");
    let article_image = document.createElement("img");
    article_image.src = item.image;
    article_image.alt = "article image";
    article_image.className = "article-imgs";
    article_image.style.width = "500px";
    article_image.style.height = "400px";
    article_image.onerror = () => {
      article_image.onerror = null;
      article_image.src = "./assets/logo.png";
    };
    articleContainer.appendChild(article_image);
  });
};

window.onload = getImageNews();
