import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Media from 'react-media';

import Grid, { GridItem } from './Grid';
import BoxManImg from '../images/boxManHead.png';
import CameraGuyImg from '../images/camera_guy.png';

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
          this.props.selectCharacter('boxMan', this.gamenameInput.value);
          break;
        case 'cg':
          this.props.selectCharacter('cameraGuy', this.gamenameInput.value);
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
      <Media query="(max-width:450px)">
        {portrait => (
          <Grid
            columns={portrait ? 2 : 3}
            style={{
              minHeight: '100%',
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            {!portrait && <GridItem column={!portrait && '1 / span 3'} />}
            <GridItem row={portrait && 2} className="character" id="box">
              <img
                src={BoxManImg}
                id="bm"
                onClick={evt => {
                  this.selectCharacter(evt);
                }}
                alt="Box Man"
                width="135%"
              />
            </GridItem>
            <GridItem
              id="center-flex"
              column={portrait && '1 / span 2'}
              style={{ textAlign: 'center' }}
            >
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
            </GridItem>
            <GridItem
              row={portrait && 2}
              style={!portrait ? { justifySelf: 'end' } : {}}
              className="character"
              id="guy"
            >
              <img
                src={CameraGuyImg}
                alt="Camera Guy"
                id="cg"
                onClick={evt => {
                  this.selectCharacter(evt);
                }}
                width="100%"
              />
            </GridItem>
          </Grid>
        )}
      </Media>
    );
  }
}

export default CharacterSelect;
