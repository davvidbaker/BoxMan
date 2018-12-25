import React, { Component } from 'react';

class Graph extends Component {
  state = {
    start: null
  };

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');

    requestAnimationFrame(this.draw);
  }

  draw = timestamp => {
    if (!this.state.start) {
      this.setState({ start: timestamp });
    }

    // console.log('this.props.data.x', this.props.data.x);
    // console.log('this.canvas.width', this.canvas.width);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      this.canvas.width / 2,
      this.canvas.height - this.props.data.x,
      5,
      5
    );

    requestAnimationFrame(this.draw);
  };

  render() {
    return (
      <canvas
        ref={c => {
          this.canvas = c;
        }}
      />
    );
  }
}

export default Graph;
