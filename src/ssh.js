import SSH2Promise from 'ssh2-promise';

export async function ssh_exec(name, password, ip, command) {
	var sshconfig = {
		host: ip,
		username: name,
		password: password,
	  }
	  
	  var ssh = new SSH2Promise(sshconfig);

	  await ssh.connect();
	  
	  const result = await ssh.exec(command);

	  ssh.close();

	  return result;
	
}

