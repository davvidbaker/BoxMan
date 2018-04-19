import React, { Component } from 'react';

function total(arr) {
  return arr.reduce((acc, cur) => acc + Math.abs(cur), 0);
}

class ShakeEffect extends Component {
  state = {
    acc: { x: 0, y: 0, z: 0 },
    rotRate: { alpha: 0, beta: 0, gamma: 0 },
    orientation: { alpha: 0, beta: 0, gamma: 0 }
  };

  componentDidMount() {
    window.addEventListener('deviceorientation', this.handleOrientation, true);
    window.addEventListener('devicemotion', this.handleMotion);
  }

  componentWillUnmount() {
    window.removeEventListener('devicemotion', this.handleMotion);
    window.removeEventListener(
      'deviceorientation',
      this.handleOrientation,
      true
    );
  }

  handleOrientation = event => {
    const { alpha, beta, gamma } = event;
    this.setState({ orientation: { alpha, beta, gamma } });
  };

  handleMotion = event => {
    const { x, y, z } = event.accelerationIncludingGravity;
    // const totalAcc = total([x, y, z]);
    const { alpha, beta, gamma } = event.rotationRate;
    // const totalRot = total([alpha, beta, gamma]);
    this.setState({
      acc: { x, y, z },
      rotRate: { alpha, beta, gamma }
    });
  };

  render() {
    return this.props.render(this.state);
  }
}

export default ShakeEffect;
