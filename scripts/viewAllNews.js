const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";
const loadingStatus = document.getElementById("loadingStatus");

const getAllNews = async () => {
  try {
    loadingStatus.innerHTML = "<h5>Loading...</h5>";
    const response = await fetch(`${base_url}/news`);
    const data = await response.json();
    console.log(data);
    displayNews(data);
  } catch (error) {
    console.log(error);
  } finally {
    loadingStatus.innerHTML = "";
  }
};

const displayNews = (data) => {
  data.map((item) => {
    let articleContainer = document.getElementById("articleContainer");

    let article = document.createElement("div");

    let article_image = document.createElement("img");

    let title = document.createElement("h4");

    let link = document.createElement("a");

    let link1 = document.createElement("a");

    // setting the title for an article
    title.innerText = item.title;

    // setting the image
    article_image.src = item.avatar;
    article_image.alt = "article image";
    article_image.width = "200";

    article_image.onerror = () => {
      article_image.onerror = null;
      article_image.src = "./assets/logo.png";
    };

    // setting the link
    link.href = `./pages/newsDetails.html?id=${item.id}`;
    // link.target = "_blank";
    link.innerHTML = "Details";

    link1.href = `./pages/updateNews.html?id=${item.id}`;
    // link1.target = "_blank";
    link1.innerHTML = "Update";

    // append all article content
    article.appendChild(article_image);
    article.appendChild(title);
    article.appendChild(link);
    article.appendChild(link1);

    articleContainer.appendChild(article);
  });
};

window.onload = getAllNews();
