const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 })
var clients = []
wss.on('connection', ws => {
  clients.push(ws);
  console.log('joined');
  ws.on('message', message => {
    console.log(message);
    clients.forEach(client => {
      try{
        var obj = JSON.parse(message)
        obj["key"] = + Date.now();
        console.log(obj);
        client.send(JSON.stringify(obj));
      }catch{}
    })
  })
})