//tratar os erros de uma maneira melhor depois 
function validatesEmails(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email)) {
      return true;
    } else {
      return false;
    }
  }
function resgister() {
  const userName = document.querySelector('input[name="user"]')  
  const email = document.querySelector('input[name="email"]')  
  const avatar = document.querySelector('input[name="avatar"]')  
  const password = document.querySelector('input[name="password"]')  

  const btnRegister = document.querySelector("#btnResgister")
  .addEventListener("click", async (e) => {
      e.preventDefault();
      if(validatesEmails(email.value)){
          const cadastre = {
            username: userName.value,
            email: email.value,
            avatar: avatar.value,
            password: password.value,
          }
          postUser(cadastre)
        }else{
          alert('digite um email valido')
        }
        });
}

async function postUser (user){

    const options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(user) 
    }
    const cadastreUser = await fetch('http://localhost:3333/users/create',options)
    const response = await cadastreUser.json()
    console.log(response)
}
function redirectsLogin(){
    const btnRedirectLogin = document.querySelectorAll('.redirectsLogin')
    .forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            location.replace("./login.html")
        }) 
    })
}
redirectsLogin()
resgister();
