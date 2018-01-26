import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Messenger extends Component {
  static propTypes = {
    send: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      message: '',
    };
  }

  sendMessage(e) {
    e.preventDefault();
    this.props.send(this.text.value);
    this.messageForm.reset();
  }

  render() {
    return (
      <div id="messenger">
        <form
          onSubmit={evt => {
            this.sendMessage(evt);
          }}
          ref={ref => {
            this.messageForm = ref;
          }}
        >
          <input
            className="message-form"
            type="text"
            ref={ref => {
              this.text = ref;
            }}
            maxLength={25}
            placeholder="send a message to Box Man"
          />
          <input className="message-form" type="submit" value="send" />
        </form>
      </div>
    );
  }
}

export default Messenger;
