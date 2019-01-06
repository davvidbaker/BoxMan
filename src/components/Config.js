import * as React from 'react';
import { connect } from 'react-redux';
import { Link, navigate } from '@reach/router';

import * as Actions from '../actions';
import RoleAndParty from './RoleAndPartySelect.js';
import CameraSelect from './CameraSelect.js';

const Config = ({
  selectRole,
  toggleFX,
  changePartyName,
  partyName,
  selectCamera,
  onSelect,
  availableCameras,
  currentUser,
  changeConstraints,
}) => {
  const [phase, setPhase] = React.useState('party');

  return (
    <div css="margin: 1em;">
      <div>
        <Link to={`/users/${currentUser || 'create'}`}>
          {currentUser || 'Create a User'}
        </Link>
      </div>
      {phase === 'party' ? (
        <RoleAndParty
          selectRole={role => {
            selectRole(role);
          }}
          toggleFX={toggleFX}
          changePhase={() => {
            setPhase('camera');
          }}
          changePartyName={changePartyName}
          partyName={partyName}
        />
      ) : (
        <CameraSelect
          selectCamera={selectCamera}
          availableCameras={availableCameras}
          partyName={partyName}
          onSelect={() => {
            onSelect();
            navigate(`/game/${partyName}`);
          }}
          changeConstraints={changeConstraints}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  role: state.role,
  partyName: state.partyName,
  availableCameras: state.camera.availableCameras,
  constraints: state.constraints,
  remoteStreamsCount: state.remoteStreamsCount,
  realTimeConnection: state.realTimeConnection,
  fxMode: state.fxMode,
  currentUser: state.currentUser,

  streamChange: state.streamChange,
  messageFromPeer: state.messageFromPeer,

  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  // push: path => dispatch(push(path)),
  selectRole: role => dispatch(Actions.selectRole(role)),

  toggleFX: checked => dispatch(Actions.toggleFX(checked)),

  changePartyName: newPartyName => dispatch(Actions.changePartyName(newPartyName)),
  changeConstraints: constraints => dispatch(Actions.changeConstraints(constraints)),

  connectToSignalServer: () => dispatch(Actions.connectToSignalServer()),

  enumerateCameras: () => dispatch(Actions.enumerateCameras()),
  foundCamera: newCamera => dispatch(Actions.foundCamera(newCamera)),

  fetchIceServers: () => dispatch(Actions.fetchIceServers()),
  initiateRTC: () => dispatch(Actions.initiateRTC()),

  clear: () => dispatch(Actions.clear()),
  reset: () => dispatch({ type: 'RESET' }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Config);
