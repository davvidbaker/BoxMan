import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Media from 'react-media';

import Grid, { GridItem } from './Grid';
import BoxManImg from '../images/boxManHead.png';
import CameraGuyImg from '../images/camera_guy.png';
import colors from '../styles/colors';

const TextInput = styled.input`
  font-family: 'Ropa Sans';
  text-align: center;
  font-size: 3vw;

  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }

  &.angry::placeholder {
    color: ${colors.red};
  }
`;

class CharacterSelect extends Component {
  static propTypes = {
    selectCharacter: PropTypes.func.isRequired,
  };

  state = {
    inputAngry: false,
  };

  componentDidMount() {
    this.channelNameInput.focus();
  }

  selectCharacter(evt) {
    if (this.channelNameInput.value.length <= 0) {
      this.channelNameInput.placeholder = 'enter a game name';
      this.setState({ inputAngry: true });
      this.channelNameInput.focus();
    } else {
      switch (evt.target.id) {
        case 'bm':
          this.props.selectCharacter('boxMan', this.channelNameInput.value);
          break;

        case 'cg':
          this.props.selectCharacter('cameraGuy', this.channelNameInput.value);
          break;

        default:
          break;
      }
      this.props.changePhase('cameraSelect');
      this.props.changeGameroom(this.channelNameInput.value);
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
              <input
                type="image"
                tabIndex={3}
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
              <h1>enter a unique name for your person</h1>
              <TextInput
                tabIndex={1}
                type="text"
                placeholder="unique name"
                className={this.state.inputAngry ? 'angry' : ''}
                innerRef={ref => {
                  this.channelNameInput = ref;
                }}
                autoCapitalize="off"
              />
              <h1>then choose your character</h1>
              <label>
                <input
                  tabIndex={2}
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
              <input
                tabIndex={4}
                type="image"
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
