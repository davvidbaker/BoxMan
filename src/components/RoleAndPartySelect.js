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

class RoleSelect extends React.Component {
  static propTypes = {
    selectRole: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.partyNameInput = React.createRef();

    this.state = {
      inputAngry: false,
      controlInput: true,
      textInput: props.partyName || '',
    };
  }

  componentDidMount() {
    this.partyNameInput.current.focus();
  }

  selectRole(evt) {
    if (this.partyNameInput.current.value.length <= 0) {
      this.partyNameInput.current.placeholder = 'enter a game name';
      this.setState({ inputAngry: true });
      this.partyNameInput.current.focus();
    } else {
      switch (evt.target.id) {
        case 'bm':
          this.props.selectRole('boxman');
          break;

        case 'cg':
          this.props.selectRole('cameraguy');
          break;

        default:
          break;
      }
      this.props.changePartyName(this.partyNameInput.current.value);
      this.props.changePhase();
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
            <GridItem row={portrait && 2} className="role" id="box">
              <div
                onClick={evt => {
                  this.selectRole(evt);
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
              </div>
            </GridItem>
            <GridItem
              id="center-flex"
              column={portrait && '1 / span 2'}
              style={{ textAlign: 'center' }}
            >
              <h1 className="bangers">enter a unique name for your party</h1>
              <TextInput
                tabIndex={1}
                type="text"
                placeholder="unique name"
                className={this.state.inputAngry ? 'angry' : ''}
                ref={this.partyNameInput}
                autoCapitalize="off"
                value={this.state.textInput}
                onChange={this.handleTextChange}
              />
              <h1 className="bangers">then choose your role</h1>
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
              className="role"
              id="guy"
            >
              <div
                onClick={evt => {
                  this.selectRole(evt);
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
              </div>
            </GridItem>
          </Grid>
        )}
      </Media>
    );
  }
}

export default RoleSelect;
