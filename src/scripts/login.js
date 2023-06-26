async function login(){
    const email = document.querySelector('input[name="email"]')
    const password = document.querySelector('input[name="password"]')
    const btnAccess = document.querySelector('.btnAccess')
    .addEventListener('click',async (e)=>{
        e.preventDefault()
        const loginUser = {
            email: email.value,
            password: password.value
        }
        const options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(loginUser) 
        }
        const cadastreUser = await fetch('http://localhost:3333/login',options)
        const response = await cadastreUser.json()
    })
}
function redirectCadastre(){
    const cadastre = document.querySelector('.btnCadastre')
    .addEventListener('click', (e)=>{
        e.preventDefault()
        location.replace("./cadastre.html")
    })
}
redirectCadastre()
login()