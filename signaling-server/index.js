/* 🤔 I think I want the signalling server to be totally stateless, buuuut do I need it for discovery...
All information about parties should come from party members directly. */
const https = require('https');
const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const WebSocket = require('ws');

function handleRequest(req, res) {
  // Process Post Request
  if (req.method === 'POST') {
    let data = '';

    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      const parseData = qs.parse(data);
      const prettyData = JSON.stringify(parseData, null, 2);
      console.log(`Post request with:\n${prettyData}`);
      res.end(prettyData);
    });
  } else {
    // Send a simple response
    res.end('Cool, everything is working. Go back to the other tab.');
  }
}

function partyMembers(wss, partyName) {
  let members = [];
  wss.clients.forEach(ws => {
    members = ws.partyName === partyName ? [...members, ws] : members;
  });
  return members;
}

function broadcastToOthers(clients, ws, data) {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      if (client.username !== ws.username) {
        console.log(`sending data to ${client.username}`, data);
        client.send(data);
      } else if (client === ws) {
        const x = `{"type": "rebound", "data": ${data}}`; // debugger;
        client.send(x);
      }
    }
  });
}

const server = https.createServer(
  {
    cert: fs.readFileSync(path.resolve(__dirname, './cert.secret.pem')),
    key: fs.readFileSync(path.resolve(__dirname, './key.secret.pem')),
  },
  handleRequest,
);
server.listen(443, () => {
  const wss = new WebSocket.Server({
    server,
  });
  console.log('wss', Boolean(wss));

  // Broadcast to all.
  // 🤯 get eslint rules working again, so functions like this that are unused get flaagged (maybe)
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };

  wss.on('connection', ws => {
    ws.username = 'no username given';

    console.log(
      chalk.green('new connection'),
      chalk.grey(`current num connections: ${wss.clients.size}`),
    );

    ws.on('message', data => {
      console.log(
        'incoming message',
        chalk.grey(`${data.substring(0, 80)}${data.length > 80 ? '...' : ''}`),
      );

      try {
        const parsed = JSON.parse(data);

        if (parsed.type === 'signal') {
          if (parsed.payload.type === 'offer') {
            /** 🔮 probably eventually only broadcast to your channel name */
            const allPartyMembers = partyMembers(wss, ws.partyName);
            console.log(
              '🔥  allPartyMembers',
              allPartyMembers.map(p => p.username),
            );

            broadcastToOthers(
              allPartyMembers.filter(p => p.username === parsed.to),
              ws,
              data,
            );
          } else if (parsed.payload.type === 'answer') {
            const allPartyMembers = partyMembers(wss, ws.partyName);
            console.log(
              '🔥  allPartyMembers',
              allPartyMembers.map(p => p.username),
            );

            broadcastToOthers(
              allPartyMembers.filter(p => p.username === parsed.to),
              ws,
              data,
            );
          }
        } else if (parsed.type === 'new member') {
          // eslint-disable-next-line
          ws.username = parsed.username;

          const existingPartyMembers = partyMembers(wss, parsed.partyName);
          console.log(
            '🔥  existingPartyMembers.map(ws => ws.username)',
            existingPartyMembers.map(ws => ws.username),
          );
          ws.send(
            JSON.stringify({
              type: 'others',
              payload: existingPartyMembers.map(p => p.username),
            }),
          );

          // eslint-disable-next-line
          ws.partyName = parsed.partyName;

          // this now includes you!
          const allPartyMembers = partyMembers(wss, ws.partyName);

          broadcastToOthers(allPartyMembers, ws, data);
        } else if (parsed.candidate) {
          const allPartyMembers = partyMembers(wss, ws.partyName);
          console.log(
            '🔥  allPartyMembers',
            allPartyMembers.map(p => p.username),
          );

          broadcastToOthers(allPartyMembers, ws, data);
        }
      } catch (e) {
        console.error('JSON parse fail', e);
      }
    });

    ws.on('close', data => {
      console.log('a socket has closed', data);
      broadcastToOthers(
        wss.clients,
        ws,
        JSON.stringify({ type: 'peer lost', username: ws.username }),
      );
    });

    ws.on('error', err => {
      console.log('error', err);
    });
  }); // clients is a Set
});
