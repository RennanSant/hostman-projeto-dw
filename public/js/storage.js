//LOAD DE HOSTS PÁGINA INICIAL
import api from './services/api.js'
import requestssh from './services/requestssh.js'

loadHosts();

async function storageStatus(user, password, ip, syso){
  const storagereturn = await requestssh.getstoragestatus(user, password, ip, syso)
  const storagereturnformated = storagereturn.replaceAll('%','').replace('\n','')
  return storagereturnformated
  
};

async function loadHosts(){ 
  
  const jsonhosts = await api.read('hosts')
  
  
  for (const host of jsonhosts) {
    try{
      const {name, user, password, address, syso, id} = host;
      if (syso == 'windows') {
        console.log('Função não disponível em sistemas Windows')
      } else {
        const used = await storageStatus(user, password, address, syso)
        const space_used = parseInt(used)
        const space_free = 100 - space_used
        createHostRow(name, address, id, space_used, space_free);
      }
      

    } catch {
      console.log('loadHosts: Sem storage para o host')
    }
    
  };
};


function createHostRow(name, address, id, used, free) {
  const hostRow = `<tr>
    <td>${name}</td>
    <td>${address}</td>
    <td>
      <canvas id="canvas-pc-${id}" width=100 height=100></canvas>
    </td>
  </tr>`
  const tbody = document.querySelector('tbody');
  tbody.insertAdjacentHTML('beforeend', hostRow);
  
  //canvasStorage(60, 40, id); //OBS ESSE É O ORIGINAL
  canvasStorage(used, free, id); //DEMONSTRAÇÃO: ocupado, livre

  
};


function canvasStorage (occupied, free, id){
  var canvas=document.getElementById(`canvas-pc-${id}`);
  //console.log(canvas)
  var ctx=canvas.getContext("2d");

  var colors=['#106cfc','#28242c'];
  var values=[occupied,free];
  var labels=['Ocupado','Livre'];

  dmbChart(50,50,42,10,values,colors,labels,0); // valores originais(150,150,125,25)

  function dmbChart(cx,cy,radius,arcwidth,values,colors,labels,selectedValue){
    var tot=0;
    var accum=0;
    var PI=Math.PI;
    var PI2=PI*2;
    var offset=-PI/2;
    ctx.lineWidth=arcwidth;
    for(var i=0;i<values.length;i++){tot+=values[i];}
    for(var i=0;i<values.length;i++){
        ctx.beginPath();
        ctx.arc(cx,cy,radius,
            offset+PI2*(accum/tot),
            offset+PI2*((accum+values[i])/tot)
        );
        ctx.strokeStyle=colors[i];
        ctx.stroke();
        accum+=values[i];
    }
    var innerRadius=radius-arcwidth-3;
    ctx.beginPath();
    ctx.arc(cx,cy,innerRadius,0,PI2);
    ctx.fillStyle=colors[selectedValue];
    ctx.fill();
    ctx.textAlign='center';
    ctx.textBaseline='bottom';
    ctx.fillStyle='white';
    ctx.font=(innerRadius)+'px verdana';
    ctx.fillText(values[selectedValue],cx,cy+innerRadius*.9);
    ctx.font=(innerRadius/4)+'px verdana';
    ctx.fillText(labels[selectedValue],cx,cy-innerRadius*.25);
  }
}
