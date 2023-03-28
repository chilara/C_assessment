const loadingStatus = document.getElementById("loadingStatus");

let url_string = window.location.href;

// convert to js representation of url and extracting the param from the url
let url = new URL(url_string);
const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";

const get_id = () => {
  return url.searchParams.get("id");
};

const articleId = get_id();

const getImageNews = async () => {
  try {
    loadingStatus.innerHTML = "<h5>Loading...</h5>";
    const response = await fetch(`${base_url}/news/${articleId}/images`);
    const data = await response.json();
    console.log(data);
    displayImages(data);
  } catch (error) {
    console.log(error);
  } finally {
    loadingStatus.innerHTML = "";
  }
};

const displayImages = (data) => {
  data.map((item) => {
    let articleContainer = document.getElementById("articleContainer");

    let article = document.createElement("div");

    let container = document.createElement("div");

    let article_image = document.createElement("img");

    article_image.src = item.image;
    article_image.alt = "article image";
    article_image.width = "200";

    article_image.onerror = () => {
      article_image.onerror = null;
      article_image.src = "./assets/logo.png";
    };

    container.appendChild(article_image);
    article.appendChild(container);
    articleContainer.appendChild(article);
  });
};

window.onload = getImageNews();
