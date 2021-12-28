//LOAD DE HOSTS PÁGINA INICIAL
import api from './services/api.js'

loadHosts();

async function loadHosts(){ 
  
  const jsonhosts = await api.read('hosts')

  for (const host of jsonhosts) {
    const {name, address, syso} = host;
    
    createHostRow(name, address, syso);
  };
};


function createHostRow(name, address, syso) {
  if (syso == 'linux') {
    const hostRow = `<tr>
      <td>${name}</td>
      <td>${address}</td>
      <td style='color: black'><b>Linux</b></td>
      <td>
        <div class="d-flex justify-content-between" style='color: black'>
          <i class="fab fa-linux"></i>
        </div>
      </td>
    </tr>`
    const tbody = document.querySelector('tbody');
    tbody.insertAdjacentHTML('beforeend', hostRow);
  } else if (syso == 'windows') { 
    const hostRow = `<tr>
      <td>${name}</td>
      <td>${address}</td>
      <td style='color: black'><b>Windows</b></td>
      <td>
        <div class="d-flex justify-content-between" style='color: black'>
        <i class="fab fa-windows"></i>
        </div>
      </td>
    </tr>`
    const tbody = document.querySelector('tbody');
    tbody.insertAdjacentHTML('beforeend', hostRow);
  }else { //Quando não houver dados de SO do host
    const hostRow = `<tr>
      <td>${name}</td>
      <td>${address}</td>
      <td style='color: grey'><b>Sem dados</b></td>
      <td>
        <div class="d-flex justify-content-between" style='color: grey'>
          <i class="fas fa-times-circle"></i>
        </div>
      </td>
    </tr>`
    const tbody = document.querySelector('tbody');
    tbody.insertAdjacentHTML('beforeend', hostRow);
  }
};
