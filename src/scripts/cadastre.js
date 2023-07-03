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
      background: `linear-gradient(to right, ${color}, #96c93d)`,
    },
  }).showToast();
}

function validatesEmails(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regex.test(email)) {
    return true;
  } else {
    return false;
  }
}

function registrationData() {
  const email = document.querySelector('input[name="email"]');
  const inputs = document.querySelectorAll("input");
  const cadastre = {};
  const btnRegister = document.querySelector("#btnResgister")
  .addEventListener("click", async (e) => {
      let  count = 0
      e.preventDefault();
      if (validatesEmails(email.value)) {
        inputs.forEach((input) => {
          if(input.value.trim() === ''){
            count++
        } 
            cadastre[input.name] = input.value;
        });
      } else {
        toast("Digite um email valido", "#8B0000");
      }
      if(count !== 0){
        count = 0 
        toast('por favor preencha os campos necessàrios',"#8B0000")
    }else{
      createUser(cadastre);
    }
    });
}

async function createUser(user) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const cadastreUser = await fetch("http://localhost:3333/users/create",options)
  .then(async (res) => {
    const message = await res.json();
    if (res.ok) {
     toast('Usuario cadastrado com sucesso', "#96c93d");
     setTimeout(() => {
      location.replace("../../");
    }, 2000);
    } else {
       throw new Error(message.message)
    }
  })
  .catch(err=>{
    toast(`${err.message}`, "#8B0000");
  })
}

function redirectsLogin() {
  const btnRedirectLogin = document
    .querySelectorAll(".redirectsLogin")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        location.replace("../../");
      });
    });
}
redirectsLogin();
registrationData();
