import * as React from 'react';
import { connect } from 'react-redux';
import { Router } from '@reach/router';

import Users from './Users';
import Nav from './Nav';
import Config from './Config';
import Game from './Game.js';
import Background from './Background';
import Debug from './Debug';
import SpeechRecognizer from './SpeechRecognizer';
import Party from './Party';
import UserForm from './UserForm';
import partyMachine from '../machines/party-machine';
import cameraMachine from '../machines/camera-machine';
import useMachine from '../machines/use-machine';
import {
  changeConstraints,
  changePartyName,
  connectToSignalServer,
  enumerateCameras,
  foundCamera,
  fetchIceServers,
  initiateRTC,
  selectCamera,
  selectRole,
  toggleFX,
  clear,
  addUser as addUserAction,
} from '../actions';

const Application = props => {
  const [remoteStreams, setRemoteStreams] = React.useState([]);
  // const [party, setParty] = React.useState({ members: [] });

  const [partyMachineState, partyMachineSend] = useMachine(partyMachine, {
    log: true,
  });

  const [cameraMachineState, cameraMachineSend] = useMachine(
    cameraMachine.withConfig(
      {},
      {
        selected: window.localStorage.getItem('selectedCameraId'),
      },
    ),
    {
      log: false,
    },
  );

  // this.state = {
  //   localStream: null,
  //   remoteStreams: [],
  //   party: { members: [] },
  // };
  // }

  /*
  async componentDidMount() {
    this.props.enumerateCameras();
    this.props.connectToSignalServer();

    // start up rtc stuff
    this.props.fetchIceServers();
  }
 */

  /*
  componentWillReceiveProps(nextProps) {
    if (nextProps.streamChange.flag !== this.props.streamChange.flag) {
      console.log('/** 🔮 handle stream change here', this.props.streamChange);

      if (this.props.streamChange.localOrRemote === 'local') {
        this.setState({ localStream: window.localStream });
      } else if (this.props.streamChange.localOrRemote === 'remote') {
        this.setState({ remoteStreams: window.remoteStreams });
      }
    }
  }
*/
  /*
  changeStream(stream, localOrRemote) {
    this.setState({ [`${localOrRemote}Stream`]: stream });
  }
*/
  const seriousProblems = Object.entries(props.seriousProblems).filter(
    ([_key, value]) => value === true,
  );

  return (
    <>
      {seriousProblems.length > 0 && (
        <div
          css="
              padding: 1em;
              background: palevioletred;
            "
        >
          THERE ARE SERIOUS PROBLEMS:
          <ul>
            {seriousProblems.map(([k, _v]) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="application">
        <Nav partyName={props.partyName} />
        <Router>
          <Config
            path="/"
            availableCameras={cameraMachineState.context.available}
            selectCamera={deviceId => cameraMachineSend({ type: 'SELECT', payload: deviceId })
            }
            onSelect={() => partyMachineSend({
              type: 'REQUEST_TO_ENTER_PARTY',
              payload: {
                partyName: props.partyName,
                username: props.currentUser,
                role: props.role,
              },
            })
            }
          />
          <Game
            path="/game/:partyName"
            initiateRTC={props.initiateRTC}
            localStream={window.localStream}
            remoteStreams={remoteStreams}
            fxMode={props.fxMode}
            constraints={props.constraints}
            role={props.role}
            partyName={props.partyName}
            realTimeConnection={props.realTimeConnection}
            messageFromPeer={props.messageFromPeer}
          />
          <Party path="/party/:partyName" remoteStreams={remoteStreams} />
          {/* ⚠️ I'd like to do this nested, but couldn't figure it out... */}
          <Users path="/users" />
          <UserForm path="/users/:username" submitUserForm={props.addUser} />
        </Router>
        <Background />
      </div>
      <video />
      {false && (
        <Debug
          localStream={window.localStream}
          remoteStreams={remoteStreams}
          role={props.role}
          partyName={props.partyName}
          clear={props.clear}
          reset={props.reset}
        />
      )}
      {false && <SpeechRecognizer />}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  seriousProblems: state.seriousProblems,
  currentUser: state.currentUser,
  role: state.role,
  partyName: state.partyName,
  constraints: state.constraints,
  remoteStreamsCount: state.remoteStreamsCount,
  realTimeConnection: state.realTimeConnection,
  fxMode: state.fxMode,

  streamChange: state.streamChange,
  messageFromPeer: state.messageFromPeer,

  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  selectRole: role => dispatch(selectRole(role)),

  toggleFX: checked => dispatch(toggleFX(checked)),

  changePartyName: newPartyName => dispatch(changePartyName(newPartyName)),
  changeConstraints: constraints => dispatch(changeConstraints(constraints)),

  connectToSignalServer: () => dispatch(connectToSignalServer()),

  enumerateCameras: () => dispatch(enumerateCameras()),
  foundCamera: newCamera => dispatch(foundCamera(newCamera)),
  selectCamera: cameraInfo => dispatch(selectCamera(cameraInfo)),

  fetchIceServers: () => dispatch(fetchIceServers()),
  initiateRTC: () => dispatch(initiateRTC()),

  clear: () => dispatch(clear()),
  reset: () => dispatch({ type: 'RESET' }),
  addUser: user => dispatch(addUserAction(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Application);
