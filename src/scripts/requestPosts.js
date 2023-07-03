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

export async function requestePostCreate(objeto) {
  const token = localStorage.getItem("tokenUser");
  const tokenUser = JSON.parse(token);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenUser.token}`,
    },
    body: JSON.stringify(objeto),
  };
  const postCreate = await fetch(`http://localhost:3333/posts/create`, options)
    .then(async (res) => {
      const response = await res.json();
      if (res.ok) {
        return response;
      } else {
        throw new Error(response.message);
      }
    })
    .catch((err) => console.log(err));
  return postCreate;
}

export async function requestePosts() {
  const token = localStorage.getItem("tokenUser");
  const tokenUser = JSON.parse(token);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenUser.token}`,
    },
  };
  const posts = await fetch(`http://localhost:3333/posts`, options)
    .then(async (res) => {
      const response = await res.json();
      if (res.ok) {
        return response;
      } else {
        throw new Error(response.message);
      }
    })
    .catch((err) => console.log(err));
  return posts;
}

export async function resquestePostId(id, objeto) {
  const token = localStorage.getItem("tokenUser");
  const tokenUser = JSON.parse(token);
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenUser.token}`,
    },
    body: JSON.stringify(objeto),
  };
  const postId = await fetch(`http://localhost:3333/posts/${id}`, options)
    .then(async (res) => {
      const response = await res.json();
      if (res.ok) {
        return response;
      } else {
        return false
      }
    })
  return postId;
}

export async function requestePostDelete(id) {
  const token = localStorage.getItem("tokenUser");
  const tokenUser = JSON.parse(token);
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenUser.token}`,
    },
  };
  const postDelete = await fetch(`http://localhost:3333/posts/${id}`, options)
    .then(async (res) => {
      const response = await res.json();
      if (res.ok) {
        toast(response.message,'#ff0000')
        return response;
      } else {
        return false
      }
    })
  return postDelete;
}
