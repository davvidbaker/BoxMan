const https = require('https');
const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const WebSocket = require('ws');

function handleRequest(req, res) {
  //Process Post Request
  if (req.method === 'POST') {
    var data = '';

    req.on('data', function(chunk) {
      data += chunk;
    });

    req.on('end', function() {
      var parseData = qs.parse(data);
      var prettyData = JSON.stringify(parseData, null, 2);
      console.log('Post request with:\n' + prettyData);
      res.end(prettyData);
    });
  } else {
    //Send a simple response
    res.end('Everything works');
  }
}

const server = https.createServer(
  {
    cert: fs.readFileSync(path.resolve(__dirname, './cert.secret.pem')),
    key: fs.readFileSync(path.resolve(__dirname, './key.secret.pem')),
  },
  handleRequest
);
server.listen(443, () => {
  const wss = new WebSocket.Server({
    server,
  });
  console.log('wss', Boolean(wss));

  // Broadcast to all.
  // 🤯 get eslint rules working again, so functions like this that are unused get flaagged (maybe)
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };

  wss.on('connection', (ws) => {

    console.log(
      chalk.green('new connection'),
      chalk.grey(`current num connections: ${wss.clients.size}`)
    );
    
    ws.on('message', (data) => {
      console.log(
        'incoming message',
        chalk.grey(`${data.substring(0, 40)}${data.length > 40 ? '...' : ''}`)
      );
      
      try {
        const parsed = JSON.parse(data);
        if (parsed.type === 'offer') {
          /** 🔮 probably eventually only broadcast to your channel name */ broadcastToOthers(
            wss.clients,
            ws,
            data
          );
        } else if (parsed.type === 'answer') {
          /** 🤔 should this be to all others? probably not, but haven't thought through */ broadcastToOthers(
            wss.clients,
            ws,
            data
          );
        } else if (parsed.candidate) {
          /** 🤔 should this be to all others? probably not, but haven't thought through */ broadcastToOthers(
            wss.clients,
            ws,
            data
          );
        }
      } catch (e) {
        console.error('JSON parse fail', e);
      }
    });

    ws.on('error', (err) => {
      console.log('error', err);
    });

  }); // clients is a Set
  function broadcastToOthers(clients, ws, data) {
    console.log('clients.size', clients.size); // Broadcast to everyone else.
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        if (client !== ws) {
          console.log('sending data to client', data);
          client.send(data);
        } else if (client === ws) {
          const x = `{"type": "rebound", "data": ${data}}`; // debugger;
          client.send(x);
        }
      }
    });
  }
});
