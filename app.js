const { spawn, exec } = require('child_process');
const rejectionStr = [' ', 'sy', 'us', 'ni', 'id', ','];

let proc = spawn('top', ['-b']);

proc.stdout.on('data', (stdout) =>{
  let stdoutSplit = stdout.toString().split('\n');

  for(let s in stdoutSplit){
    if(stdoutSplit[s].indexOf('%Cpu') == 0){
      let result = {}
      let line = stdoutSplit[s].replace(/  /g, ' ');
      let splitArr = line.split(' ');

      result.user = splitArr[1];
      result.system = splitArr[3];
      result.nice = splitArr[5];
      result.idle = splitArr[7];

      console.log(result);
    }
  }
});