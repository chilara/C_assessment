const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";

const createForm = document.getElementById("createForm");
const author = document.getElementById("author1");
const title = document.getElementById("newsTitle");
const avatar = document.getElementById("avatarLink");
const url = document.getElementById("newsUrl");
const createButton = document.getElementById("createBtn");
const serverMessage = document.getElementById("serverMsg");
const submitNews = async () => {
  let body = {
    author: author.value.trim(),
    title: title.value.trim(),
    avatar: avatar.value.trim(),
    url: url.value.trim(),
  };
  createButton.style.cursor = "not-allowed";
  createButton.disabled = true;
  createButton.innerText = "saving";

  try {
    let response = await fetch(`${base_url}/news`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let jsonRes = await response.json();
    console.log(jsonRes);
    createButton.style.cursor = "pointer";
    createButton.disabled = false;
    createButton.innerText = "Create";
    serverMessage.innerText = "News created Successfully";
    window.location.replace("../index.html");
  } catch (error) {
    serverMessage.innerText = "An error occurred";
  } finally {
    createButton.style.cursor = "pointer";
    createButton.disabled = false;
    createButton.innerText = "Create";
  }
};

createForm.addEventListener("submit", function (e) {
  e.preventDefault();
  submitNews();
});
