import api from './services/api.js';

// createUserRow('rennan');
// createUserRow('manoel');
// createUserRow('pedro');

loadUserslogin();
handleSubmitNewUser();
window.destroyUser = destroyUser;

async function loadUserslogin(){ 
    const jsonusers = await api.read('userLogin'); 
    
    for (const userlogin of jsonusers) {
      const {user, password} = userlogin;
      
      createUserRow(user);
    };
};

function createUserRow(user) {
    const userRow = `<th>
        <div class="container-fluid p-4" id="user-${user}">
        <div class="card">
            <div class="card-header" style="background-color: #106cfc">
            <table class="table">
                <thead>
                <tr>
                    <th><h3 class="text-left" style="color: #fff">${user}</h3></th>
                    <th><i class="fas fa-trash" style="cursor: pointer;" onclick="destroyUser('${user}');"></i></th>
                </tr>
                </thead>
            </table>
            </div>      
            <div class="card-body" style="background-color: #212529">
            <img src="../imgs/User_icon_WHITE-01.png" height="100" width="120">
            </div>
        </div>
        </div>
    </th>
    `
    const tbody = document.querySelector('tr');
    tbody.insertAdjacentHTML('beforeend', userRow);
};


function destroyUser(user) {
    api.destroy(`userLogin/${user}`);
    const userRow = document.querySelector(`#user-${user}`);
    userRow.remove();
};


function handleSubmitNewUser() {
    const form = document.querySelector('form');
  
    const myModal = new bootstrap.Modal(document.getElementById('modalcadastrouser'), {
      keyboard: false
    });
  
    form.onsubmit = (event) => {
      event.preventDefault();
  
      console.log('New user');
  
      const formData = Object.fromEntries(new FormData(form));
      console.log(formData)
      const {user, password} = formData;
      
      api.create_legacy('userLogin', formData);
  
      createUserRow(user);
      
      console.log("createUserRow executado");
  
      form.reset();
      myModal.hide();
      //location.reload();
    }
  };

