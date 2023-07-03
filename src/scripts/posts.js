import {
  requestePostCreate,
  requestePostDelete,
  requestePosts,
  resquestePostId,
} from "./requestPosts.js";
function toast(menssage, color) {
  Toastify({
    text: `${menssage}`,
    duration: 4000,
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: `${color}`,
    },
  }).showToast();
}

async function rederScrean() {
  const posts = document.querySelector(".posts");
  posts.innerHTML = "";
  const publish = await requestePosts();
  publish.forEach((obj) => {
    const bound = 145;
    const maximumCharacters =
      obj.content.length > bound
        ? obj.content.slice(0, bound) + "..."
        : obj.content;

    const handlingDate = new Date(`${obj.createdAt}`).toLocaleDateString();
    const container = document.createElement("div");
    container.classList.add("post__container");

    const postHeader = document.createElement("div");
    postHeader.classList.add("post__header");

    const postInfo = document.createElement("div");
    postInfo.classList.add("post__info");

    const avatar = document.createElement("img");
    avatar.classList.add("post__img");
    avatar.src = obj.user.avatar;

    const username = document.createElement("p");
    username.classList.add("post__name");
    username.textContent = obj.user.username;

    const dateContainer = document.createElement("div");
    const postDate = document.createElement("p");
    postDate.classList.add("post__date");
    postDate.textContent = handlingDate;
    dateContainer.appendChild(postDate);

    postInfo.appendChild(avatar);
    postInfo.appendChild(username);
    postInfo.appendChild(dateContainer);

    const postHero = document.createElement("div");
    postHero.classList.add("post__hero");

    const editButton = document.createElement("button");
    editButton.classList.add("redirect-edit__button", "btnEdit");
    editButton.value = obj.id;
    editButton.textContent = "Editar";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("close-cancel__button");
    deleteButton.classList.add("btn__delete");
    deleteButton.value = obj.id;
    deleteButton.textContent = "Excluir";

    postHero.appendChild(editButton);
    postHero.appendChild(deleteButton);

    postHeader.appendChild(postInfo);
    postHeader.appendChild(postHero);

    const article = document.createElement("article");

    const title = document.createElement("h2");
    title.classList.add("post__title");
    title.textContent = obj.title;

    const text = document.createElement("p");
    text.classList.add("post__text");
    text.id = "textConfig";
    text.textContent = maximumCharacters;

    const showText = document.createElement("span");
    showText.classList.add("showText");
    showText.id = obj.id;
    showText.textContent = "Acessar Publicações";

    article.appendChild(title);
    article.appendChild(text);
    article.appendChild(showText);

    container.appendChild(postHeader);
    container.appendChild(article);

    posts.appendChild(container);
  });
  showPost();
  editPost();
  delePost();
}
function modalPublish() {
  const modal = document.querySelector("#createPost");
  const btnShowmodal = document.querySelector("#btnShowModalPost");
  btnShowmodal.addEventListener("click", (e) => {
    modal.showModal();
  });
  const contentPublication = {};
  let count = 0;
  const inputs = document.querySelectorAll(".publish");
  const btnPublish = document.querySelector("#btnPublish");
  btnPublish.addEventListener("click", async (e) => {
    e.preventDefault();
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }
      contentPublication[input.name] = input.value;
      input.value = "";
    });
    if (count !== 0) {
      count = 0;
      toast("preencha todos os campos", "#8B0000");
    } else {
      await requestePostCreate(contentPublication);
      rederScrean();
      modal.close();
    }
  });
  const btnCloseModal = document.querySelectorAll(".modalPostClose");
  btnCloseModal.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      inputs.forEach((input) => {
        input.value = "";
      });
      modal.close();
    });
  });
}
async function editPost() {
  const posts = await requestePosts();
  const modal = document.querySelector("#editPost");
  const inputs = document.querySelectorAll(".edit");
  const btnShowModal = document.querySelectorAll(".btnEdit");
  btnShowModal.forEach((btn) => {
    btn.addEventListener("click", (btnId) => {
      btnId.preventDefault();
      modal.showModal();
      const searchPost = posts.find((post) => post.id === btnId.target.value);
      inputs[0].value = searchPost.title;
      inputs[1].value = searchPost.content;
      let postId = btnId.target.value;
      let contentEdited = {};

      const btnEdit = document.querySelector("#btnEdit");
      btnEdit.addEventListener("click", async (e) => {
        console.log(postId);
        inputs.forEach((input) => {
          contentEdited[input.name] = input.value;
        });
        e.preventDefault();

        await resquestePostId(postId, contentEdited);
        if (!(await resquestePostId(postId, contentEdited))) {
          toast("Apenas o dono da publicação pode edita-la.", "#ff0000");
        } else {
          rederScrean();
        }
        modal.close();
        postId = "";
        contentEdited = "";
      });
    });
  });
  const btnCloseModal = document.querySelectorAll(".modalEditClose");
  btnCloseModal.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.close();
    });
  });
}
function delePost() {
  const modal = document.querySelector("#dialogDelte");
  const btnDelete = document.querySelectorAll(".btn__delete");
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      modal.showModal();
      let deleteId = e.target.value;
      const confirmDelete = document.querySelector("#confirmDelete");
      confirmDelete.addEventListener("click", async () => {
        await requestePostDelete(deleteId);
        if (!(await requestePostDelete(deleteId))) {
          rederScrean();
        } else {
          toast("Apenas o dono da publicação pode deletá-la.", "#ff0000");
        }
        modal.close();
      });
      const cancelDelete = document.querySelectorAll(".cancelDelete");
      cancelDelete.forEach((btn) => {
        btn.addEventListener("click", () => {
          modal.close();
          deleteId = "";
        });
      });
    });
  });
}
async function showPost() {
  const posts = await requestePosts();
  const btncloseModal = document.querySelector(".modalClose");
  const modal = document.querySelector("#showPublication");
  const userImg = document.querySelector(".publication__img");
  const userName = document.querySelector(".publication__name");
  const postData = document.querySelector(".publication__date");
  const postTitle = document.querySelector(".publication__title");
  const postText = document.querySelector(".showPublication__text");
  const showText = document.querySelectorAll(".showText");

  showText.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const searchPost = posts.find((post) => post.id === e.target.id);
      const handlingDate = new Date(
        `${searchPost.createdAt}`
      ).toLocaleDateString();
      userImg.setAttribute("src", searchPost.user.avatar);
      userName.innerHTML = searchPost.user.username;
      postData.innerHTML = handlingDate;
      postTitle.innerHTML = searchPost.title;
      postText.innerHTML = searchPost.content;
      modal.showModal();
    });
  });
  btncloseModal.addEventListener("click", () => {
    modal.close();
  });
}

await rederScrean();
await showPost();
modalPublish();
