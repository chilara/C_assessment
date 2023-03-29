let uploadImage = document.getElementById("upload-image");
let addBtn = document.getElementById("createBtn");
const createForm = document.getElementById("createForm");
const url_string = window.location.href;

// convert to js representation of url  and extracting the param from the url
let url = new URL(url_string);
const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";

const get_id = () => {
  return url.searchParams.get("id");
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

  // add comments
  add.innerText = "add";
  add.id = "imgAdd";
  const inputComment = document.getElementById("add");

  // edit comments
  edit.innerText = "edit";
  edit.id = "imgEdit";

  // delete comments
  del.innerText = "delete";
  del.style.backgroundColor = "red";
  del.style.color = "#fff";
  del.style.cursor = "pointer";
  del.style.border = "none";

  del.onclick = async () => {
    try {
      const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";
      await fetch(`${base_url}/news/${item.id}/comments/${item.id}`, {
        method: "DELETE",
      });
      location.reload();
    } catch (e) {
      alert("An error occurred");
    }
  };
};

const imgBtnFn = async () => {
  try {
    await fetch(`${base_url}/news/${get_id()}/images`, {
      method: "POST",
      body: JSON.stringify({
        newsId: get_id(),
        image: uploadImage.value.trim(),
      }),
    });
    window.history.back();
  } catch (error) {
    console.log(error);
  }
};

createForm.addEventListener("submit", function (e) {
  e.preventDefault();
  imgBtnFn();
});
