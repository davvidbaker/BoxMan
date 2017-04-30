import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CharacterSelect extends Component {
  static propTypes = {
    selectCharacter: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.gamenameInput.focus();
  }

  selectCharacter(evt) {
    if (this.gamenameInput.value.length <= 0) {
      this.gamenameInput.placeholder = 'enter a game name';
      this.gamenameInput.className = 'angry';
      this.gamenameInput.focus();
    } else {
      switch (evt.target.id) {
        case 'bm':
          this.props.selectCharacter(
            'boxMan',
            this.gamenameInput.value,
          );
          break;
        case 'cg':
          this.props.selectCharacter(
            'cameraGuy',
            this.gamenameInput.value,
          );
          break;
        default:
          break;
      }
      this.props.changePhase('cameraSelect');
      this.props.changeGameroom(this.gamenameInput.value);
    }
  }

  render() {
    return (
      <div id="character-select">
        <div className="character" id="box">
          <img
            src="images/boxManHead.png"
            id="bm"
            onClick={evt => {
              this.selectCharacter(evt);
            }}
            alt="Box Man"
            width="135%"
          />
        </div>
        <div id="center-flex">
          <h1>enter a unique name for your game</h1>
          <input
            id="gamename"
            type="text"
            placeholder="your game name"
            ref={ref => {
              this.gamenameInput = ref;
            }}
            autoCapitalize="off"
          />
          <h1>then choose your character</h1>
          <label>
            <input
              type="checkbox"
              ref={'fx'}
              onClick={evt => {
                this.props.toggleFX(evt.target.checked);
              }}
            />FX Mode
          </label>
        </div>
        <div className="character" id="guy">
          <img
            src="images/camera_guy.png"
            alt="Camera Guy"
            id="cg"
            onClick={evt => {
              this.selectCharacter(evt);
            }}
            width="100%"
          />
        </div>

      </div>
    );
  }
}

export default CharacterSelect;
