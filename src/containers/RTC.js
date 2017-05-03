// import React from 'react';
// import PropTypes from 'prop-types'

// /* ====================================================
//   Component that handles all the webrtc connection stuff.
//   I made this a component so it could tell its parent component when videos are added and deleted. I think that makes sense...
// ==================================================== */
// class RTC {
//   static propTypes = {
//     config: PropTypes.shape({
//       character: PropTypes.string.isRequired,
//       roomName: PropTypes.string.isRequired,
//       constraints: PropTypes.shape({
//         audio: PropTypes.bool.isRequired,
//         video: PropTypes.oneOfType([
//           PropTypes.bool,
//           PropTypes.object
//         ]).isRequired
//       }).isRequired,
//       iceServers: PropTypes.object
//     }),
//     addedVideo: PropTypes.func,
//     removedVideo: PropTypes.func,
//     newMessage: PropTypes.func.isRequired,
//   }

//   componentDidMount: function() {
//     this._connect(this.props.config);
//   },

//   _connect: function(config) {
//     console.log('clicked connect');
//     this._stunAndTurn(config);
//   },

//   // specify stun and turn servers for help establishing connection between clients
//   _stunAndTurn: function(config) {

//   },

//   _setUpRTC: function(config) {

//   },
//   render: function() {
//     return null;
//   }
// });

// export default RTC;
