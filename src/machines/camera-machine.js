import * as XState from 'xstate';

const { Machine } = XState;

const { assign } = XState.actions;

const cameraMachine = Machine(
  {
    id: 'camera',
    initial: 'enumeratingDevices',
    context: {
      /* 💁 selected is just the deviceId */
      selected: null,
      available: [],
    },
    states: {
      enumeratingDevices: {
        invoke: {
          id: 'enumerateDevices',
          src: () => navigator.mediaDevices.enumerateDevices(),
          onDone: {
            target: 'devicesEnumerated',
            /* 💁 this wasn't working as an action string */
            actions: assign({
              available: (ctx, event) => event.data.filter(
                deviceInformation => deviceInformation.kind === 'videoinput',
              ),
            }),
          },
          onError: {
            target: 'failure',
            actions: assign({ error: (ctx, event) => event.data }),
          },
        },
      },
      devicesEnumerated: {
        on: {
          '': [
            {
              target: 'noCameras',
              cond: 'noCamerasFound',
            },
            {
              target: 'gettingUserMedia',
              cond: 'cameraAlreadySelected',
            },
            {
              target: 'idle',
              cond: 'camerasFound',
            },
          ],
        },
      },
      failure: {},
      noCameras: {},
      idle: {
        on: {
          SELECT: {
            target: 'gettingUserMedia',
            actions: 'assignCamera'
          },
        },
      },
      gettingUserMedia: {
        invoke: {
          id: 'getUserMedia',
          src: ctx => {
            const constraints = {
              audio: false,
              video: {
                deviceId: ctx.selected ? { exact: ctx.selected } : undefined,
              },
            };

            return navigator.mediaDevices.getUserMedia(constraints);
          },
          onDone: {
            target: 'streaming',
            actions: (ctx, event) => {
              // side effect
              window.localStream = event.data;
            },
          },
          onError: 'failure',
        },
      },
      streaming: {
        on: {
          SELECT: {
            target: 'gettingUserMedia',
            actions: 'assignCamera',
          },
        },
      },
    },
  },
  {
    actions: {
      assignCamera: assign({
        selected: (ctx, event) => {
          window.localStorage.setItem('selectedCameraId', event.payload);
          return event.payload;
        },
      }),
    },
    guards: {
      noCamerasFound: ctx => ctx.available.length === 0,
      camerasFound: ctx => ctx.available.length > 0,
      cameraAlreadySelected: ctx => ctx.selected !== null,
    },
  },
);

export default cameraMachine;
