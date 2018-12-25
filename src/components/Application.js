import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Link } from '@reach/router';
// import { BrowserRouter, Route, Link } from 'react-router-dom';
// import { push } from 'react-router-redux';

import Home from './Home';
import Game from './Game.js';
import Debug from './Debug';
import {
  changeCamera,
  changeConstraints,
  changeGameroom,
  changePhase,
  connectToSignalServer,
  enumerateCameras,
  foundCamera,
  fetchIceServers,
  initiateRTC,
  selectCamera,
  selectCharacter,
  toggleFX,
  clear,
} from '../actions';

class Application extends Component {
  constructor() {
    super();

    /** Redux can't store MediaStream objects in its store, but doing it at React state level works. */
    this.state = { localStream: null, remoteStreams: [] };
  }

  async componentDidMount() {
    /* Start 👁looking👁 for cameras as soon as component mounts */
    this.props.enumerateCameras();
    this.props.connectToSignalServer();

    // start up rtc stuff
    this.props.fetchIceServers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.phase === 'game' && this.props.phase !== 'game') {
      this.props.initiateRTC();
    }

    if (nextProps.streamChange.flag !== this.props.streamChange.flag) {
      console.log('/** 🔮 handle stream change here', this.props.streamChange);

      if (this.props.streamChange.localOrRemote === 'local') {
        this.setState({ localStream: window.localStream });
      } else if (this.props.streamChange.localOrRemote === 'remote') {
        this.setState({ remoteStreams: window.remoteStreams });
      }
    }
  }

  changeStream(stream, localOrRemote) {
    this.setState({ [`${localOrRemote}Stream`]: stream });
  }

  render() {
    const Other = props => console.log('🔥 other appolication', props) || <div>other</div>;

    return (
      <>
        <div className="application">
          <Router>
            <Home path="*" phase={this.props.phase} />
            <Game
              path="/game/:roomName"
              initiateRTC={this.props.initiateRTC}
              localStream={this.state.localStream}
              remoteStreams={this.state.remoteStreams}
              fxMode={this.props.fxMode}
              constraints={this.props.constraints}
              character={this.props.character}
              gameroom={this.props.gameroom}
              realTimeConnection={this.props.realTimeConnection}
              messageFromPeer={this.props.messageFromPeer}
            />
          </Router>
          <div id="background-title">
            <p id="title">BOX MAN</p>
            <p id="subtitle">OUT OF BODY</p>
          </div>
        </div>
        <video />
        {false && (
          <Debug
            localStream={this.state.localStream}
            remoteStreams={this.state.remoteStreams}
            character={this.props.character}
            channelName={this.props.channelName}
            clear={this.props.clear}
            reset={this.props.reset}
          />
        )}
      </>
    );
  }
}

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
  push: path => dispatch(push(path)),
  selectCharacter: character => dispatch(selectCharacter(character)),

  toggleFX: checked => dispatch(toggleFX(checked)),

  changePhase: newPhase => dispatch(changePhase(newPhase)),
  changeGameroom: newGameroom => dispatch(changeGameroom(newGameroom)),
  changeCamera: selectedCamera => dispatch(changeCamera(selectedCamera)),
  changeConstraints: constraints => dispatch(changeConstraints(constraints)),

  connectToSignalServer: () => dispatch(connectToSignalServer()),

  enumerateCameras: () => dispatch(enumerateCameras()),
  foundCamera: newCamera => dispatch(foundCamera(newCamera)),
  selectCamera: cameraInfo => dispatch(selectCamera(cameraInfo)),

  fetchIceServers: () => dispatch(fetchIceServers()),
  initiateRTC: () => dispatch(initiateRTC()),

  clear: () => dispatch(clear()),
  reset: () => dispatch({ type: 'RESET' }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Application);
