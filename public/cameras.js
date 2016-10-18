let videoElement = document.querySelector('video');
let videoSelect = document.querySelector('select');

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(err => {console.error(err);});

function gotDevices(deviceInfos) {
  console.log('gotDevices', deviceInfos);

  for (let i = 0; i < deviceInfos.length; i++) {
    let option = document.createElement('option');
    option.value = deviceInfos[i].deviceId;
    console.log(i);
    if (deviceInfos[i].kind === 'videoinput') {
      option.text = deviceInfos[i].label || `camera ${videoSelect.length}`;
      videoSelect.appendChild(option);
      console.log(option);
    }
  }
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

function start() {
  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }
  var videoSource = videoSelect.value;
  var constraints = {
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  navigator.mediaDevices.getUserMedia(constraints).
      then(gotStream).then(gotDevices).catch(err => console.error(err));
}

videoSelect.onchange = start;
