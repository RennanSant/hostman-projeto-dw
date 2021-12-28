import { ssh_exec } from './ssh.js';
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Hosts from './models/Hosts.js';
import User_logs from './models/User_logs.js';
import User_login from './models/User_login.js';
import Auth from './middlewares/auth.js';

dotenv.config();

const app = express();
app.use(express.static('public'));
app.use(cors()); // Access-Control-Allow-Origin: *
app.use(express.json());

// LOAD --> DADOS DO BANCO
gethosts(); 
posthosts();
deletehosts(); 
getuserlogs();
postuserlogs();
getuserlogin();
postuserlogin();
deleteuser();
usersignin();
//LOAD --> FUNCOES DA PAGINA
sys_turn_off();
sys_restart();
sys_suspend();
sys_hibernate();
sys_userlock();
sys_storage_status();


/// AREA IMPLEMENTAÇÃO COM BANCO DE DADOS
async function gethosts() {
  app.get('/hosts', async (req, res) => {
    console.log('GET NO /HOSTS DB')
    const hosts = await Hosts.readAll();
    
    res.json(hosts);
  });
};

async function posthosts() {
  app.post('/hosts', async (req, res) => {
    console.log('POST NO /HOSTS DB')
    const data = req.body;
    console.log(data)
    const host = await Hosts.load(data);
  
    res.json(host);
  });
};

async function deletehosts() {
  app.delete('/hosts/:id', async (req, res) => {
    console.log('DELETE NO /HOSTS DB')
    const { id } = req.params;

    if (await Hosts.destroy(id)) {
        res.status(204).send();
    } else {
        throw new Error('Não conseguiu apagar o Host!');
    };
  });
};

async function getuserlogs() {
  app.get('/userLogs', async (req, res) => {
    console.log('GET NO /userLogs DB');
    const userLog = await User_logs.readAll();
  
    res.json(userLog);
  });
};

async function postuserlogs() {
  app.post('/userLogs', async (req, res) => {
    console.log('POST NO /userLogs DB')
    const data = req.body;
    console.log(data)
    const userLog = await User_logs.load(data);
  
    res.json(userLog)
  });
};

async function getuserlogin() {
  app.get('/userLogin', async (req, res) => {
    console.log('GET NO /USERLOGIN')
    const userLogin = await User_login.readAll();
  
    res.json(userLogin);
  });
};

async function postuserlogin() {
  app.post('/userLogin', async (req, res) => {
    console.log('POST NO /USERLOGIN, CADASTRANDO USUÁRIO')
    const data = req.body;
    
    const userLogin = await User_login.load(data);
  
    res.json(userLogin)
  });
};

async function deleteuser() {
  app.delete('/userLogin/:user', async (req, res) => {
    console.log('DELETE NO /USERLOGIN DB')
    const { user } = req.params;
    
    if (await User_login.destroy(user)) {
        res.status(204).send();
    } else {
        throw new Error('Não pode apagar Usuário!');
    };
  });
};

async function usersignin () {
  app.post('/signin', async (req, res) => {
    try {
      const { user, password } = req.body;

      const jsonusers = await User_login.readByUser(user);
      const { password:hash , id: userId } = jsonusers[0]

      const match = await bcrypt.compare(password, hash);

      if (match) {
        const token = jwt.sign({ userId }, process.env.SECRET, {
          expiresIn: 300 // 5min
        });

        res.json({ auth: true, token });
      } else {
        throw new Error();
      }
    } catch (error) {
      res.status(401).json({ error: "User not found" });
    }
      
  });
}; 
///
  

/// AREA GERENCIAMENTO DOS HOSTS

async function sys_turn_off () {
  app.get('/sshturnoff', async (req, res) => {
    const name = req.query.name;
    const password = req.query.password;
    const ip = req.query.ip;
    const syso = req.query.syso;
    if (syso == 'linux') {
      const result = await ssh_exec(name, password, ip, `shutdown now`);	
      console.log(result); 
    } else if (syso == 'windows') {
      const result = await ssh_exec(name, password, ip, `shutdown /f /s /t 1`);	
      console.log(result); 
    };
    
  });
};

async function sys_restart () {
  app.get('/sshrestart', async (req, res) => {
    const name = req.query.name;
    const password = req.query.password;
    const ip = req.query.ip;
    const syso = req.query.syso;
    if (syso == 'linux') {
      const result = await ssh_exec(name, password, ip, `shutdown now -r`);	
      console.log(result); 
    } else if (syso == 'windows') {
      const result = await ssh_exec(name, password, ip, `shutdown /f /r /t 1`);	
      console.log(result); 
    };
    
  });
};

async function sys_suspend () {
  app.get('/sshsuspend',  async (req, res) => {
    const name = req.query.name;
    const password = req.query.password;
    const ip = req.query.ip;
    const syso = req.query.syso;
    if (syso == 'linux') {
      const result = await ssh_exec(name, password, ip, `systemctl suspend`);	
      console.log(result);  
    } else if (syso == 'windows') {
      const result = await ssh_exec(name, password, ip, `shutdown /h`);	
      console.log(result); 
    };
    
  });
};

async function sys_hibernate () {
  app.get('/sshhibernate',  async (req, res) => {
    const name = req.query.name;
    const password = req.query.password;
    const ip = req.query.ip;
    const syso = req.query.syso;
    if (syso == 'linux') {
      const result = await ssh_exec(name, password, ip, `systemctl hibernate`);	
      console.log(result);  
    } else if (syso == 'windows') {
      const result = await ssh_exec(name, password, ip, `shutdown /h`);	
      console.log(result); 
    };
        
  });
};

async function sys_userlock () {
  app.get('/sshuserlock',  async (req, res) => {
    const name = req.query.name;
    const password = req.query.password;
    const ip = req.query.ip;
    const syso = req.query.syso;
    if (syso == 'linux') {
      const result = await ssh_exec(name, password, ip, `xflock4`);	
      console.log(result); 
    } else if (syso == 'windows') {
      const result = await ssh_exec(name, password, ip, `shutdown /l`);	
      console.log(result); 
    };
    
  });
};

async function sys_storage_status() {
  app.get('/sshstoragestatus', async (req, res) => {
    //console.log('sys_storage_status requisitado')
    const name = req.query.name;
    const password = req.query.password;
    const ip = req.query.ip;
    const result = await ssh_exec(name, password, ip, `df -h / | cut -d " " -f 14`);	//COMANDO DE PEDRO
    //console.log(result); 
    res.send(result);
  });
};


app.listen(3000, () => {
  console.log(`App running at http://localhost:3000`);
});
