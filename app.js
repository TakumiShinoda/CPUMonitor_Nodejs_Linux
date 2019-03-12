const { spawn, exec } = require('child_process');
const fetch = require('node-fetch');
const local_property = require('./local_property.json');

let proc = spawn('top', ['-b']);

proc.stdout.on('data', (stdout) =>{
  let stdoutSplit = stdout.toString().split('\n');

  for(let s in stdoutSplit){
    if(stdoutSplit[s].indexOf('%Cpu') == 0){
      let result = {}
      let line = stdoutSplit[s].replace(/  /g, ' ');
      let splitArr = line.split(' ');
      let CPUUsage = 0;

      result.user = splitArr[1];
      CPUUsage += parseInt(splitArr[1]);
      result.system = splitArr[3];
      CPUUsage = parseInt(splitArr[3]);
      result.nice = splitArr[5];
      CPUUsage = parseInt(splitArr[5]);
      result.idle = splitArr[7];

      fetch(local_property.postUrl + (CPUUsage).toString())
        .then((resp) => {
          console.log(result);
        })
        .catch((err) => {console.log(err)});
    }
  }
});