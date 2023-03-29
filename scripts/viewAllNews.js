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

    let container = document.createElement("div");

    let article_image = document.createElement("img");

    let img_link = document.createElement("a");

    let title = document.createElement("h4");

    let link = document.createElement("a");

    let link1 = document.createElement("a");

    let delLink = document.createElement("a");

    delLink.innerText = "delete";
    delLink.style.backgroundColor = "red";
    delLink.style.color = "#fff";
    delLink.style.cursor = "pointer";
    delLink.style.border = "none";

    delLink.onclick = async () => {
      try {
        delStatus.innerHTML = "<h5>deleting...</h5>";
        delLink.style.cursor = "not-allowed";
        delLink.disabled = true;

        const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";
        await fetch(`${base_url}/news/${item.id}`, { method: "DELETE" });
        location.reload();
      } catch (e) {
        alert("An error occurred");
      } finally {
        delStatus.innerHTML = "";
        delStatus.style.cursor = "pointer";
        delStatus.disabled = false;
      }
    };

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
    link.innerHTML = "Details";
    link.id = "imgD";

    link1.href = `./pages/updateNews.html?id=${item.id}`;
    link1.style.border = "1px solid #0644cc";
    link1.innerHTML = "Update";
    link1.id = "imgH";

    img_link.href = `./pages/viewAllImages.html?id=${item.id}`;
    img_link.innerHTML = "images";
    img_link.style.height = "19px";
    img_link.id = "imgL";

    article.style.backgroundColor = "#f8f9fd";
    article.style.padding = "20px";
    article.style.borderRadius = "5px";
    article.style.marginBottom = "3%";
    article.style.boxShadow = "3px 10px 13px -2px rgba(0, 0, 0, 0.15)";

    container.style.display = "flex";
    container.style.gap = "20px";
    container.backgroundColor = "transparent";

    // append all article content
    container.appendChild(article_image);
    container.appendChild(img_link);
    article.appendChild(container);
    article.appendChild(title);
    article.appendChild(link);
    article.appendChild(link1);
    article.appendChild(delLink);

    articleContainer.appendChild(article);
  });
};

window.onload = getAllNews();
