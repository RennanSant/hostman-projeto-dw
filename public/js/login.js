import api from './services/api.js'
import Auth from "./services/auth.js"

async function logindatenow(username){
  const now = new Date
  console.log(now)
  await api.create_legacy('userLogs', { 
    "date":`"${now}"`,
    "user":`"${username}"` 
  }, false)
};

const form = document.querySelector('form');

form.onsubmit = async (event) => {
  event.preventDefault();

  console.log('Tentativa de Login');


  const formData = new FormData(form); 
  const user = formData.get("user"); //Pega a tag com name="user"
  
  const userdata = Object.fromEntries(new FormData(form));
  
  const { auth, token } = await api.create("signin", userdata, false);
  
  if (auth) {
    console.log("Login efetuado");
    await logindatenow(user);
    Auth.signin(token);
  }
};  





