import React from 'react';

const CharacterSelect= React.createClass({
  propTypes:{
    selectCharacter: React.PropTypes.func.isRequired
  },

  _selCharacter: function(event) {
    console.log('_selcharacter', event.target.id)
    switch (event.target.id) {
      case 'bm': 
        this.props.selectCharacter('boxMan');
        break;
      case 'cg':
        this.props.selectCharacter('cameraGuy');
        break;
      default: break;
    }
    // this.props.selectCharacter(char);
  },

  render: function() {
    return (
      <div>
        <p>Choose your character</p>
        <p id="bm" onClick={this._selCharacter}> BoxMan </p>
        <p id="cg" onClick={this._selCharacter}> CameraGuy </p>
      </div>
    );
  }
});

export default CharacterSelect;