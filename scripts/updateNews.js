let url_string = window.location.href;

// convert to js representation of url and extracting the param from the url
let url = new URL(url_string);
const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";

const get_id = () => {
  return url.searchParams.get("id");
};

const getSingleNews = async (id) => {
  try {
    const response = await fetch(`${base_url}/news/${id}`);
    const newsData = await response.json();
    return newsData;
  } catch (error) {
    console.log(error);
  }
};

const articleId = get_id();
const updateForm = document.getElementById("updateForm");
const serverMessage = document.getElementById("serverMsg");
const loadingStatus = document.getElementById("loadingStatus");
const author1 = document.getElementById("author1");
const newsTitle = document.getElementById("newsTitle");
const newsUrl = document.getElementById("newsUrl");
const avatarLink = document.getElementById("avatarLink");
const createBtn = document.getElementById("createBtn");

const fetchNewsDetails = async () => {
  try {
    loadingStatus.innerHTML = "<h5>Loading...</h5>";
    const singleNewsDetail = await getSingleNews(articleId);
    console.log(singleNewsDetail);
    loadingStatus.innerHTML = "";
    updateForm.style.display = "block";
    author1.value = singleNewsDetail.author || "";
    avatarLink.value = singleNewsDetail.avatar || "";
    newsTitle.value = singleNewsDetail.title || "";
    newsUrl.value = singleNewsDetail.url || "";
  } catch (error) {
    serverMessage.innerText = "error occurred";
  } finally {
    loadingStatus.innerText = "";
  }
};

const updateNews = async () => {
  const body = {
    author1: author1.value.trim(),
    newsTitle: newsTitle.value.trim(),
    avatarLink: avatarLink.value.trim(),
    newsUrl: newsUrl.value.trim(),
  };

  try {
    createBtn.innerText = "updating";
    createBtn.style.cursor = "not-allowed";
    createBtn.disabled = true;
    let response = await fetch(`${base_url}/news/${articleId}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let jsonRes = await response.json();
    serverMessage.innerText = "update successful";
  } catch (error) {
    serverMessage.innerText = "error occurred while updating article";
  } finally {
    createBtn.innerText = "update";
    createBtn.style.cursor = "pointer";
    createBtn.disabled = false;
    author1.value = "";
    newsTitle.value = "";
    avatarLink.value = "";
    newsUrl.value = "";
  }
};

updateForm.addEventListener("submit", function (e) {
  e.preventDefault();
  updateNews();
});

window.onload = fetchNewsDetails();
