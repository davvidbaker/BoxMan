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
        <div className="character" id="box" >
          <img src="images/boxManHead.png" id="bm" onClick={this._selCharacter} alt="Box Man" width="135%" />
        </div>
        <div id="center-flex">
          <h1>enter a unique name for your game</h1>
          <input id="gamename" type="text" placeholder="your game name" ref={"gamename"} autoCapitalize="off"/>
          <h1>then choose your character</h1>
        </div>
        <div className="character" id="guy">
          <img src="images/camera_guy.png" alt="Camera Guy" id="cg" onClick={this._selCharacter} width="100%"/>
        </div>
        
      </div>
    );
  }
});

export default CharacterSelect;