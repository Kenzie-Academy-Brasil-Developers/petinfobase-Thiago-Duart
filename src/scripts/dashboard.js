function authentication(){
  const token = localStorage.getItem("tokenUser");
  const tokenUser = JSON.parse(token);

  if(!token){
    location.replace('../../')
  }
}
async function requestInfoUser() {
  const token = localStorage.getItem("tokenUser");
  const tokenUser = JSON.parse(token);
   const options = {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${tokenUser.token}`,
    },
   };
  const userInfos = await fetch("http://localhost:3333/users/profile",options)
  .then(async (res) => {
    const response = await res.json();
    return response;
  })
  .catch(err=>console.log(err))
  return userInfos;
}

async function profileUser() {
  const { avatar,username } = await requestInfoUser();

  const headerImg = document.querySelector(".header__hero");
  const avatarProfile = document.querySelector("#imgProfile");
  avatarProfile.setAttribute("src", `${avatar}`);
  headerImg.insertAdjacentElement("beforeend", avatarProfile);

  const  logoutUserName = document.querySelector('#user__name')
  logoutUserName.innerHTML = `@${username}`
}
function logout(){
  const logoutContainer = document.querySelector('.logout__container')
  const avatarProfile = document.querySelector("#imgProfile");
  avatarProfile.addEventListener('click',()=>{
    if(logoutContainer.classList.contains('displayNone')){
       logoutContainer.classList.remove('displayNone')
    }else{
       logoutContainer.classList.add('displayNone')
    }
  })
  const logoutUser = document.querySelector('.logout__content')
  logoutUser.addEventListener('click',()=>{
      localStorage.clear('token')
      location.replace('../../')
  })
}
logout()
profileUser()
authentication()


