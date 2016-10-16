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
// start.onclick = makeConnection;

(function stunAndTurn() {
  console.log('connecting to XirSys...')
  let STUN_TURN_SECRET = '09f8d0aa-7940-11e5-8514-a68d4d023276';
  const url = `https://service.xirsys.com/ice?ident=brainsandspace&secret=${process.env.STUN_TURN_SECRET}&domain=www.brainsandspace.com&application=default&room=default&secure=1`;
  // specify stun and turn servers for signalling
  // fetch('https://service.xirsys.com/ice?ident=brainsandspace&secret=09f8d0aa-7940-11e5-8514-a68d4d023276&domain=www.brainsandspace.com&application=default&room=default&secure=1')
  fetch(url)
  .then(response => {
    return response.json();
  })
  .then((data) => {
    // data.d is where the iceServers object lives
    console.log('...connected to XirSys', data.d);
  })
  .catch((err) => {
    console.error(err)
  });
})()