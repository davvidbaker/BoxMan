import React from 'react';

// change this
const roomName = "testing";

const Game = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Boxman the game</h2>
      </div>
    );
  }
});

export default Game;

let start = document.getElementById('start');
start.onclick = stunAndTurn;

// specify stun and turn servers for help establishing connection between clients
function stunAndTurn() {
  console.log('connecting to XirSys...');
  // I know including the secret here isn't super secure, but it's a free stun and turn server so whatevs
  fetch('https://service.xirsys.com/ice?ident=brainsandspace&secret=09f8d0aa-7940-11e5-8514-a68d4d023276&domain=www.brainsandspace.com&application=default&room=default&secure=1')
  .then(response => {
    return response.json();
  })
  .then((data) => {
    // data.d is where the ICE servers object lives
    console.log('...connected to XirSys', data.d);
    setUpRTC(data.d);
  })
  .catch((err) => {
    console.error(err);
  });
}

function setUpRTC(iceServers) {
  const webrtc = new SimpleWebRTC({
    localVideoEl: 'localVideo',
    remoteVideoEl: 'remoteVideos',
    autoRequestMedia: true,
    // TODO specify this based on character
    media: {
      audio: false,
      video: true
    },
    peerConnectionConfig: iceServers
  });

  webrtc.on('readyToCall', () => {
    webrtc.joinRoom(roomName, (err, roomDescription) => {
      if (err) console.error(err);
      console.log('roomDescription', roomDescription);
    });
  });

  webrtc.on('videoAdded', (videoEl, peer) => {
    console.log(peer)
    console.log(videoEl.srcObject);
    let leftVid = document.querySelector('.vid-box-left');
    let rightVid = document.querySelector('.vid-box-right');
    document.body.appendChild(videoEl)
    console.log(videoEl.attributes)
    console.log('videoAdded', videoEl, videoEl.src);
    console.log('video el src', videoEl.src)
    rightVid.attributes.src = videoEl.src;
    console.log(rightVid);

    // set the video srcObject to that of the incoming video
    leftVid.srcObject =videoEl.srcObject;
  });
}
