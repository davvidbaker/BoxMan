import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { push } from 'react-router-redux';

import CharacterSelect from '../components/CharacterSelect.js';
import CameraSelect from '../components/CameraSelect.js';
import Game from '../components/Game.js';
import Debug from '../components/Debug';
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
    return (
      <BrowserRouter>
        <div className="application">
          <Route
            path="/"
            render={({ location }) =>
              this.props.phase === 'characterSelect' ? (
                <CharacterSelect
                  selectCharacter={character => {
                    this.props.selectCharacter(character);
                    this.props.push(`/${character}`);
                  }}
                  toggleFX={this.props.toggleFX}
                  changePhase={this.props.changePhase}
                  changeGameroom={this.props.changeGameroom}
                  channelName={this.props.channelName}
                />
              ) : this.props.phase === 'cameraSelect' ? (
                <CameraSelect
                  character={this.props.character}
                  selectCamera={this.props.selectCamera}
                  availableCameras={this.props.availableCameras}
                  // changeStream={(stream, localOrRemote) => {
                  //   this.changeStream(stream, localOrRemote);
                  // }}
                  changePhase={this.props.changePhase}
                  changeConstraints={this.props.changeConstraints}
                />
              ) : (
                <Game
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
              )
            }
          />
          <Debug isVisible={false}>
            <div>
              localStream:{' '}
              {JSON.stringify(
                this.state.localStream && this.state.localStream.id
              )}
            </div>
            <ul>
              remoteStreams:{' '}
              {this.state.remoteStreams &&
                this.state.remoteStreams.map(stream => (
                  <li key={stream.id}>{stream && stream.id}</li>
                ))}
            </ul>
            <div>character: {this.props.character}</div>
            <div>
              channelName:{' '}
              {this.props.channelName
                ? this.props.channelName.match(/(.*)-boxman/)[1]
                : ''}
            </div>
            <button style={{ zIndex: 1000 }} onClick={this.props.clear}>
              CLEAR
            </button>
          </Debug>
          <div id="background-title">
            <p id="title">BOX MAN</p>
            <p id="subtitle">OUT OF BODY</p>
          </div>
          <video />
        </div>
      </BrowserRouter>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
