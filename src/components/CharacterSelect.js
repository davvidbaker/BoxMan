/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { Link } from '@reach/router';

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

class CharacterSelect extends React.Component {
  static propTypes = {
    selectCharacter: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.channelNameInput = React.createRef();

    this.state = {
      inputAngry: false,
      controlInput: true,
      textInput: props.channelName || '',
    };
  }

  componentDidMount() {
    this.channelNameInput.current.focus();
  }

  selectCharacter(evt) {
    if (this.channelNameInput.current.value.length <= 0) {
      this.channelNameInput.current.placeholder = 'enter a game name';
      this.setState({ inputAngry: true });
      this.channelNameInput.current.focus();
    } else {
      switch (evt.target.id) {
        case 'bm':
          this.props.selectCharacter(
            'boxman',
            this.channelNameInput.current.value,
          );
          break;

        case 'cg':
          this.props.selectCharacter(
            'cameraguy',
            this.channelNameInput.current.value,
          );
          break;

        default:
          break;
      }
      this.props.changePhase('cameraSelect');
      this.props.changeGameroom(this.channelNameInput.current.value);
      // navigate('/camera-select');
    }
  }

  handleTextChange = e => {
    this.setState({ textInput: e.target.value });
  };

  uncontrolInput = () => {
    if (this.state.controlInput) {
      this.setState({ controlInput: false });
    }
  };

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
              <Link
                to={this.state.textInput.length > 0 ? 'camera-select' : ''}
                onClick={evt => {
                  this.selectCharacter(evt);
                }}
              >
                <input
                  type="image"
                  tabIndex={3}
                  src={BoxManImg}
                  id="bm"
                  alt="Box Man"
                  width="135%"
                />
              </Link>
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
                ref={this.channelNameInput}
                autoCapitalize="off"
                value={this.state.textInput}
                onChange={this.handleTextChange}
              />
              <h1>then choose your character</h1>
              <label>
                <input
                  tabIndex={2}
                  type="checkbox"
                  ref="fx"
                  onClick={evt => {
                    this.props.toggleFX(evt.target.checked);
                  }}
                />
                FX Mode
              </label>
            </GridItem>
            <GridItem
              row={portrait && 2}
              style={!portrait ? { justifySelf: 'end' } : {}}
              className="character"
              id="guy"
            >
              <Link
                to={this.state.textInput.length > 0 ? 'camera-select' : ''}
                onClick={evt => {
                  this.selectCharacter(evt);
                }}
              >
                <input
                  tabIndex={4}
                  type="image"
                  src={CameraGuyImg}
                  alt="Camera Guy"
                  id="cg"
                  width="100%"
                />
              </Link>
            </GridItem>
          </Grid>
        )}
      </Media>
    );
  }
}

export default CharacterSelect;
