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

async function login(){
  const spiner = document.querySelector('.lds-ring')
    let loginUser = {}
    const inputsLogin = document.querySelectorAll('input')
    const btnAccess = document.querySelector('.btnAccess')
    .addEventListener('click',async (e)=>{
        e.preventDefault()
        inputsLogin.forEach( input => {
            loginUser[input.name] = input.value
        });
        
        const options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(loginUser) 
        }
        const cadastreUser = await fetch('http://localhost:3333/login',options)
        .then(async(res)=>{
            const responseToken = await res.json()
            if(res.ok){
                spiner.classList.remove('displaySpiner')
                const token = JSON.stringify(responseToken)
                localStorage.setItem('tokenUser', token)
                setTimeout(() => {
                    location.replace("./src/pages/dashboard.html")
                }, 2000);
            }else{
                spiner.classList.add('displaySpiner')
                throw new Error(responseToken.message);
            }
        }).catch(err=>{toast(`${err.message}`,"#8B0000")})    
    })
}
function redirectCadastre(){
    const cadastre = document.querySelector('.btnCadastre')
    .addEventListener('click', (e)=>{
        e.preventDefault()
        location.replace("./src/pages/cadastre.html")
    })
}
function authentication(){
    const token = localStorage.getItem("tokenUser");
    const tokenUser = JSON.parse(token);
  
    if(token){
      location.replace('./src/pages/dashboard.html')
    }
  }
authentication()
redirectCadastre()
login()