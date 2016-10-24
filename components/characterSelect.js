import React from 'react';

const CharacterSelect= React.createClass({
  propTypes:{
    selectCharacter: React.PropTypes.func.isRequired
  },

  componentDidMount: function() {
    this.refs.gamename.focus();
  },

  _selCharacter: function(event) {
    if (this.refs.gamename.value.length <= 0){
      this.refs.gamename.placeholder = "enter a game name";
      document.getElementById('gamename').className += 'angry';
      this.refs.gamename.focus();
    } 
    else {
      switch (event.target.id) {
      case 'bm': 
        this.props.selectCharacter('boxMan', this.refs.gamename.value);
        break;
      case 'cg':
        this.props.selectCharacter('cameraGuy', this.refs.gamename.value);
        break;
      default: break;
    }  
    }
    
  },

  render: function() {
    return (
      <div id="character-select">
        <h1>enter a unique name for your game</h1>
        <input id="gamename" type="text" placeholder="your game name" ref="gamename" autoCapitalize="off"/>
        <h1>Choose your character</h1>
        <div id="character-container" >
          <div className="character"><img src="images/boxManHead.png" id="bm" onClick={this._selCharacter} width="135%" /></div>
          <div className="character"><img src="images/camera_guy.png" id="cg" onClick={this._selCharacter} width="100%"/></div>
        </div>
      </div>
    );
  }
});

export default CharacterSelect;