import * as XState from 'xstate';

const { Machine } = XState;

const { assign } = XState.actions;

const setSelected = assign({
  selectedStream: (ctx, event) => event.stream_id,
});

const addPeer = assign({
  remoteStreams: (ctx, event) => console.log('🔥  event', event) || [...ctx.remoteStreams, event.stream_id],
});

const removePeer = assign({
  remoteStreams: (ctx, event) => console.log('🔥  event', event)
    || ctx.remoteStreams.filter(id => id !== event.stream_id),
});

const multipleStreamsAvailable = ctx => ctx.remoteStreams.length + ctx.localStreams.length > 1;

const streamSelectMachine = Machine(
  {
    id: 'stream-select',
    initial: 'single',
    context: {
      localStreams: [],
      remoteStreams: [],
      selectedStream: null,
    },
    states: {
      single: {
        on: {
          PEER_JOIN: {
            target: 'singleWithPreview',
            actions: ['addPeer'],
          },
          PEER_LEAVE: {
            actions: 'removePeer',
          },
          DISPLAY_MODE_CHANGE: {
            target: 'multi',
            cond: 'multipleStreamsAvailable',
          },
        },
      },
      singleWithPreview: {
        on: {
          STREAM_SELECT: {
            target: 'single',
            actions: 'setSelected',
          },
          TIMEOUT: {
            target: 'single',
          },
        },
      },
      multi: {
        on: {
          DISPLAY_MODE_CHANGE: {
            target: 'single',
          },
          PEER_JOIN: {
            target: 'multi',
            actions: 'addPeer',
          },
          PEER_LEAVE: {
            target: 'multi',
            actions: 'removePeer',
          },
        },
      },
    },
  },
  {
    actions: { setSelected, addPeer, removePeer },
    guards: { multipleStreamsAvailable },
  },
);

export default streamSelectMachine;
