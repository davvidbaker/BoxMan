import * as React from 'react';
import { connect } from 'react-redux';
import { Router } from '@reach/router';
import * as a from '../actions';

import CharacterSelect from './CharacterSelect.js';
import CameraSelect from './CameraSelect.js';

const Home = ({
  location,
  phase,
  selectCharacter,
  toggleFX,
  changePhase,
  changeGameroom,
  channelName,
  character,
  selectCamera,
  availableCameras,
  changeConstraints,
}) => (
  <Router>
    <CharacterSelect
      path="/"
      selectCharacter={character => {
        selectCharacter(character);
        // this.props.push(`/${character}`);
      }}
      toggleFX={toggleFX}
      changePhase={changePhase}
      changeGameroom={changeGameroom}
      channelName={channelName}
    />
    <CameraSelect
      path="camera-select"
      selectCamera={selectCamera}
      availableCameras={availableCameras}
      // changeStream={(stream, localOrRemote) => {
      //   this.changeStream(stream, localOrRemote);
      // }}
      channelName={channelName}
      changePhase={changePhase}
      changeConstraints={changeConstraints}
    />
  </Router>
);

const mapStateToProps = (state, ownProps) => ({
  phase: state.phase,
  character: state.character,
  gameroom: state.gameroom,
  availableCameras: state.camera.availableCameras,
  constraints: state.constraints,
  remoteStreamsCount: state.remoteStreamsCount,
  realTimeConnection: state.realTimeConnection,
  fxMode: state.fxMode,
  channelName: state.channelName,

  streamChange: state.streamChange,
  messageFromPeer: state.messageFromPeer,

  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  // push: path => dispatch(push(path)),
  selectCharacter: character => dispatch(a.selectCharacter(character)),

  toggleFX: checked => dispatch(a.toggleFX(checked)),

  changePhase: newPhase => dispatch(a.changePhase(newPhase)),
  changeGameroom: newGameroom => dispatch(a.changeGameroom(newGameroom)),
  changeCamera: selectedCamera => dispatch(a.changeCamera(selectedCamera)),
  changeConstraints: constraints => dispatch(a.changeConstraints(constraints)),

  connectToSignalServer: () => dispatch(a.connectToSignalServer()),

  enumerateCameras: () => dispatch(a.enumerateCameras()),
  foundCamera: newCamera => dispatch(a.foundCamera(newCamera)),
  selectCamera: cameraInfo => dispatch(a.selectCamera(cameraInfo)),

  fetchIceServers: () => dispatch(a.fetchIceServers()),
  initiateRTC: () => dispatch(a.initiateRTC()),

  clear: () => dispatch(a.clear()),
  reset: () => dispatch({ type: 'RESET' }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
