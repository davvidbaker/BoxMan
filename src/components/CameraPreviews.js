import * as React from 'react';
import styled from 'styled-components';

const VideoBubble = styled.video`
  width: 50px;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 20px;
  box-shadow: 0px 0px 3px 0px white;
`;

const Right = styled.div`
  left: 50vw;
  position: relative;
`;
const Left = styled.div`
  position: relative;
`;

class CameraPreviews extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
    this.videoRef2 = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.videoRef.current.srcObject = this.props.streams[0];
      this.videoRef2.current.srcObject = this.props.streams[0];
    }, 1000);
  }

  render() {
    return (
      <div>
        <Left>
          <VideoBubble ref={this.videoRef} autoPlay />
        </Left>
        <Right>
          <VideoBubble ref={this.videoRef2} autoPlay />
        </Right>
      </div>
    );
  }
}

export default CameraPreviews;
