/* eslint-disable react/button-has-type */
import React from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';

const Wrapper = styled.pre`
  position: absolute;
  color: red;
  display: ${props => (props.isVisible ? 'block' : 'none')};
  background: rgba(0, 0, 0, 0.8);
  padding: 1em;
  margin: 0;
  top: 0;
  z-index: 10;
`;

const Debug = ({
  localStream,
  character,
  channelName,
  remoteStreams,
  clear,
  reset,
}) => (
  <Wrapper isVisible>
    <div>
      localStream:
      {JSON.stringify(localStream && localStream.id)}
    </div>
    <ul>
      remoteStreamsLength:
      {' '}
      {remoteStreams ? remoteStreams.length : 'not showing up'}
      remoteStreams:
      {' '}
      {remoteStreams
        && remoteStreams.map(stream => (
          <li key={stream.id}>{stream && stream.id}</li>
        ))}
    </ul>
    <div>
      character:
      {character}
    </div>
    <div>
      channelName:
      {channelName || ''}
    </div>
    <button
      style={{ zIndex: 1000 }}
      onClick={() => {
        navigate('/');
        clear();
      }}
    >
      CLEAR
    </button>

    <button
      style={{ zIndex: 1000 }}
      onClick={() => {
        navigate('/');
        reset();
      }}
    >
      RESET
    </button>
  </Wrapper>
);

export default Debug;
