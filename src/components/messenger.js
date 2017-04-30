import React from 'react';

const Messenger = React.createClass({
  getInitialState: function () {
    return {
      message: ''
    };
  },

  propTypes: {
    send: React.PropTypes.func.isRequired
  },

  _sendMessage: function (e) {
    e.preventDefault();
    console.log('resetting form');
    this.props.send(this.refs.text.value);
    this.refs.messageForm.reset();
  },

  render: function () {
    return (
      <div id="messenger">
        <form onSubmit={this._sendMessage} ref={"messageForm"}>
          <input className="message-form" type="text" maxLength={25} ref={"text"} placeholder="send a message to Box Man" />
          <input className="message-form" type="submit" value="send" />
        </form>
      </div>
    );
  }
});

export default Messenger;