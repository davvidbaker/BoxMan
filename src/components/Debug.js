import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.pre`
  position: absolute;
  color: red;
  background: rgba(0, 0, 0, 0.8);
  padding: 1em;
  margin: 0;
  top: 0;
  z-index: 10;
`;

const Debug = props => {
  console.log(props);
  return <Wrapper>{props.children}</Wrapper>;
};

export default Debug;
