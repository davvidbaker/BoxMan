import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CharacterSelect from 'components/CharacterSelect.js';
import CameraSelect from 'components/CameraSelect.js';
import Game from 'components/Game.js';
import {
  selectCharacter,
  toggleFX,
  changePhase,
  changeGameroom,
  changeConstraints,
  changeCamera,
  foundCamera,
} from 'actions';

class Application extends Component {
  static propTypes = {
    localStream: PropTypes.object,
    remoteStream: PropTypes.object,
  };


  constructor() {
    super();
    
    /** Redux can't store MediaStream objects in its store, but doing it at React state level works. */
    this.state = { localStream: null, remoteStream: null };
  }

  componentDidMount() {
    /* Start 👁looking👁 for cameras as soon as component mounts */
    navigator.mediaDevices
      .enumerateDevices()
      .then(deviceInfos => {
        this.gotDevices(deviceInfos);
      })
      .catch(err => {
        console.error(err);
      });
  }

  changeStream(stream, localOrRemote) {
    this.setState({ [`${localOrRemote}Stream`]: stream });
  }

  gotDevices(deviceInfos) {
    for (let i = 0; i < deviceInfos.length; i++) {
      if (deviceInfos[i].kind === 'videoinput') {
        this.props.foundCamera(deviceInfos[i]);
      }
    }
    // if boxman, choose the back camera automatically (if it is available)
    // I am assuming the back camera is listed second...this should be done with a regex TODO still need to ensure the right camera is chosen
    /*if (
      this.props.character === 'boxMan' &&
      this.state.availableCams.length > 0
    ) {
      this.state.availableCams.forEach(cam => {
        if (cam.label.includes('Logitech') || cam.label.includes('back'))
          this.props.changeCamera(cam.deviceId);
      });
    }*/
  }

  render() {
    return (
      <div className="application">
        <div id="background-title">
          <p id="title">BOX MAN</p>
          <p id="subtitle">OUT OF BODY</p>
        </div>
        {this.props.phase === 'characterSelect'
          ? <CharacterSelect
              selectCharacter={this.props.selectCharacter}
              toggleFX={this.props.toggleFX}
              changePhase={this.props.changePhase}
              changeGameroom={this.props.changeGameroom}
            />
          : this.props.phase === 'cameraSelect'
              ? <CameraSelect
                  character={this.props.character}
                  availableCameras={this.props.availableCameras}
                  changeStream={(stream, localOrRemote) => {
                    this.changeStream(stream, localOrRemote);
                  }}
                  changePhase={this.props.changePhase}
                  changeConstraints={this.props.changeConstraints}
                />
              : <Game
                  localStream={this.state.localStream}
                  fxMode={this.props.fxMode}
                  constraints={this.props.constraints}
                  character={this.props.character}
                  gameroom={this.props.gameroom}
                />}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  phase: state.phase,
  character: state.character,
  gameroom: state.gameroom,
  availableCameras: state.camera.availableCameras,
  constraints: state.constraints,
  
  camera: null,
  localStream: null,
  fxMode: false,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  selectCharacter: character => dispatch(selectCharacter(character)),
  toggleFX: checked => dispatch(toggleFX(checked)),
  changePhase: newPhase => dispatch(changePhase(newPhase)),
  changeGameroom: newGameroom => dispatch(changeGameroom(newGameroom)),
  changeCamera: selectedCamera => dispatch(changeCamera(selectedCamera)),
  changeConstraints: constraints => dispatch(changeConstraints(constraints)),
  foundCamera: newCamera => dispatch(foundCamera(newCamera)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
