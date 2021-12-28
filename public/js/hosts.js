//LOAD HOSTS NA PÁGINA DE HOSTS
import api from './services/api.js'
import requestssh from './services/requestssh.js'

loadHosts();
handleSubmitNewHost();
window.destroyHost = destroyHost;


////////
document.getElementById("desligar").onclick = function () { // 
  console.log("Desligando hosts: ")
  var chkhosts = document.querySelectorAll(":checked");
  for (const checkbox of chkhosts){
    //console.log(checkbox.value)
    const chkvalor = checkbox.value
    const [user, password, ip, syso] = chkvalor.replaceAll('@',' ').split(' ')
    console.log(`ID: ${checkbox.id}`) 
    console.log(`User: ${user}`)
    console.log(`Password: ${password}`)
    console.log(`IP: ${ip}`)
    console.log(`SO: ${syso}`)
    requestssh.getpoweroff(user, password, ip, syso) //
  };
};

document.getElementById("reiniciar").onclick = function () { // 
  console.log("Reiniciando hosts: ")
  var chkhosts = document.querySelectorAll(":checked");
  for (const checkbox of chkhosts){
    //console.log(checkbox.value)
    const chkvalor = checkbox.value
    const [user, password, ip, syso] = chkvalor.replaceAll('@',' ').split(' ')
    console.log(`ID: ${checkbox.id}`) 
    console.log(`User: ${user}`)
    console.log(`Password: ${password}`)
    console.log(`IP: ${ip}`)
    console.log(`SO: ${syso}`)
    requestssh.getrestart(user, password, ip, syso) //
  };
};

document.getElementById("suspender").onclick = function () { // systemctl suspend comando para suspender linux
  console.log("Suspendendo hosts: ")
  var chkhosts = document.querySelectorAll(":checked");
  for (const checkbox of chkhosts){
    //console.log(checkbox.value)
    const chkvalor = checkbox.value
    const [user, password, ip, syso] = chkvalor.replaceAll('@',' ').split(' ')
    console.log(`ID: ${checkbox.id}`) 
    console.log(`User: ${user}`)
    console.log(`Password: ${password}`)
    console.log(`IP: ${ip}`)
    console.log(`SO: ${syso}`)
    requestssh.getsuspend(user, password, ip, syso) //
  };
};

document.getElementById("hibernar").onclick = function () {  // systemctl hibernate comando para suspender linux 
  console.log("Hibernando hosts: ")
  var chkhosts = document.querySelectorAll(":checked");
  for (const checkbox of chkhosts){
    //console.log(checkbox.value)
    const chkvalor = checkbox.value
    const [user, password, ip, syso] = chkvalor.replaceAll('@',' ').split(' ')
    console.log(`ID: ${checkbox.id}`) 
    console.log(`User: ${user}`)
    console.log(`Password: ${password}`)
    console.log(`IP: ${ip}`)
    console.log(`SO: ${syso}`)
    requestssh.gethibernate(user, password, ip, syso) //
  };
};

document.getElementById("bloquear").onclick = function () { // xflock4 comando usado para bloquear user no linux
  console.log("Bloqueando hosts: ")
  var chkhosts = document.querySelectorAll(":checked");
  for (const checkbox of chkhosts){
    //console.log(checkbox.value)
    const chkvalor = checkbox.value
    const [user, password, ip, syso] = chkvalor.replaceAll('@',' ').split(' ')
    console.log(`ID: ${checkbox.id}`) 
    console.log(`User: ${user}`)
    console.log(`Password: ${password}`)
    console.log(`IP: ${ip}`)
    console.log(`SO: ${syso}`)
    requestssh.getuserlock(user, password, ip, syso) // ÚLTIMA FUNÇÃO TRABALHADA
  };
}; 
////////


function destroyHost(id) {
  api.destroy(`hosts/${id}`);
  const hostRow = document.querySelector(`#host-${id}`);
  hostRow.remove();
};

async function loadHosts(){ 
  const jsonhosts = await api.read('hosts'); 

  for (const host of jsonhosts) {
    const {name, address, id, user, password, syso} = host;
    
    createHostRow(name, address, id, user, password, syso);
  };
};


function createHostRow(name, address, id, user, password, syso) {
  if (syso == 'linux') {
    const hostRow = `<tr class="host" id="host-${id}">
      <td>
        <input type="checkbox" id="host-checkbox-${id}" value="${user}@${password}@${address}@${syso}">
      </td>
      <td>${name}</td>
      <td>${address}</td>
      <td style='color: black'><b>Linux</b></td>
      <td>
        <div class="d-flex justify-content-between" style='color: black'>
          <i class="fab fa-linux"></i>
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-between">
          <i class="fas fa-trash" onclick="destroyHost(${id});"></i>
        </div>
      </td>
    </tr>`
    const tbody = document.querySelector('tbody');
    tbody.insertAdjacentHTML('beforeend', hostRow);
  } else if (syso == 'windows') {
    const hostRow = `<tr class="host" id="host-${id}">
      <td>
        <input type="checkbox" id="host-checkbox-${id}" value="${user}@${password}@${address}@${syso}">
      </td>
      <td>${name}</td>
      <td>${address}</td>
      <td style='color: black'><b>Windows</b></td>
      <td>
        <div class="d-flex justify-content-between" style='color: black'>
          <i class="fab fa-windows"></i>
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-between">
          <i class="fas fa-trash" onclick="destroyHost(${id})"></i>
        </div>
      </td>
    </tr>`
    const tbody = document.querySelector('tbody');
    tbody.insertAdjacentHTML('beforeend', hostRow);
  }else { //Quando não houver dados do SO do host //altera value root e senha
    const hostRow = `<tr class="host" id="host-${id}">
      <td>
        <input type="checkbox" id="host-checkbox-${id}" value="${user}@${password}@${address}@${syso}">
      </td>
      <td>${name}</td>
      <td>${address}</td>
      <td style='color: grey'><b>Sem dados</b></td>
      <td>
        <div class="d-flex justify-content-between" style='color: grey'>
          <i class="fas fa-times-circle"></i>
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-between">
          <i class="fas fa-trash" onclick="destroyHost(${id})"></i>
        </div>
      </td>
    </tr>`
    const tbody = document.querySelector('tbody');
    tbody.insertAdjacentHTML('beforeend', hostRow);
  }
};

function handleSubmitNewHost() {
  const form = document.querySelector('form');

  const myModal = new bootstrap.Modal(document.getElementById('modalcadastro'), {
    keyboard: false
  });

  form.onsubmit = (event) => {
    event.preventDefault();

    console.log('New host');
    const formData = Object.fromEntries(new FormData(form));
    console.log(formData)
    const {name, address, user, password, syso} = formData;
    
    api.create('hosts', formData);
    
    const id = "";
    createHostRow(name, address, id, user, password, syso);
    console.log("createHostRow executado");

    form.reset();
    myModal.hide();

    location.reload();
  }
};

