import api from './services/api.js'

loadLogs();

async function loadLogs(){ 
    const jsonlogs = await api.read('userLogs')
  
    for (const log of jsonlogs) {
      const {user, date} = log;
      
      createLogsRow(user, date);
    };
  };

function createLogsRow(user, date){
    const hostRow = `<tr>
    <td>${user}</td>
    <td>${date}</td>
    </td>
  </tr>`
  const tbody = document.querySelector('tbody');
  tbody.insertAdjacentHTML('beforeend', hostRow);
}