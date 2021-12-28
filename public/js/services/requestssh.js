const domain = 'http://127.0.0.1:3000/';

async function getpoweroff(user, password, ip, syso) {
  const url = `${domain}sshturnoff?name=${user}&password=${password}&ip=${ip}&syso=${syso}`;
  const response = await fetch(url);
};

async function getrestart(user, password, ip, syso) {
  const url = `${domain}sshrestart?name=${user}&password=${password}&ip=${ip}&syso=${syso}`;
  const response = await fetch(url);
};

async function getsuspend(user, password, ip, syso) {
  const url = `${domain}sshsuspend?name=${user}&password=${password}&ip=${ip}&syso=${syso}`;
  const response = await fetch(url);
};

async function gethibernate(user, password, ip, syso) {
  const url = `${domain}sshhibernate?name=${user}&password=${password}&ip=${ip}&syso=${syso}`;
  const response = await fetch(url);
};

async function getuserlock(user, password, ip, syso) {
  const url = `${domain}sshuserlock?name=${user}&password=${password}&ip=${ip}&syso=${syso}`;
  const response = await fetch(url);
};

async function getstoragestatus(user, password, ip, syso) {
  const url = `${domain}sshstoragestatus?name=${user}&password=${password}&ip=${ip}&syso=${syso}`;
  const response = await fetch(url);
  return response.text();
};



export default { getpoweroff, getrestart, getsuspend, gethibernate, getuserlock, getstoragestatus };