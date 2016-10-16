import React from 'react';

const Game = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Boxman the game</h2>
      </div>
    );
  }
})

export default Game;

let start = document.getElementById('start');
start.onclick = stunAndTurn;

// specify stun and turn servers
function stunAndTurn() {
  console.log('connecting to XirSys...')
  let customConfig;  // object consisting of array of XirSys STUN / TURN servers
  fetch('https://service.xirsys.com/ice', {
    method: "GET",
    body: {
      ident: "brainsandspace",
      secret: process.env.STUN_TURN_SECRET, // this is defined in heroku config var
      domain: "www.brainsandspace.com",
      application: "default",
      room: "default",
      secure: 1
    }
  })
  .then((data, status) => {
    console.log('...connected to XirSys', data.d);
    const config = data.d; // data.d is where the iceServers object lives
    setupSimpleWebRTC(config);
  })
  .catch((err) => {
    console.error(err)
  });
}
