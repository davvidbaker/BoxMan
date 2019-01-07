import * as React from 'react';

// from mrdoob https://github.com/mrdoob/daydream-controller.js/
function DaydreamController() {
  const state = {};

  function connect() {
    return navigator.bluetooth
      .requestDevice({
        filters: [
          {
            name: 'Daydream controller',
          },
        ],
        optionalServices: [0xfe55],
      })
      .then(device => device.gatt.connect())
      .then(server => server.getPrimaryService(0xfe55))
      .then(service => service.getCharacteristic('00000001-1000-1000-8000-00805f9b34fb'), )
      .then(characteristic => {
        characteristic.addEventListener(
          'characteristicvaluechanged',
          handleData,
        );
        return characteristic.startNotifications();
      })
      .catch(e => console.log('🔥e ', e));
  }

  function handleData(event) {
    const data = event.target.value;

    // http://stackoverflow.com/questions/40730809/use-daydream-controller-on-hololens-or-outside-daydream/40753551#40753551

    state.isClickDown = (data.getUint8(18) & 0x1) > 0;
    state.isAppDown = (data.getUint8(18) & 0x4) > 0;
    state.isHomeDown = (data.getUint8(18) & 0x2) > 0;
    state.isVolPlusDown = (data.getUint8(18) & 0x10) > 0;
    state.isVolMinusDown = (data.getUint8(18) & 0x8) > 0;

    state.time = ((data.getUint8(0) & 0xff) << 1) | ((data.getUint8(1) & 0x80) >> 7);

    state.seq = (data.getUint8(1) & 0x7c) >> 2;

    state.xOri = ((data.getUint8(1) & 0x03) << 11)
      | ((data.getUint8(2) & 0xff) << 3)
      | ((data.getUint8(3) & 0x80) >> 5);
    state.xOri = (state.xOri << 19) >> 19;
    state.xOri *= (2 * Math.PI) / 4095.0;

    state.yOri = ((data.getUint8(3) & 0x1f) << 8) | (data.getUint8(4) & 0xff);
    state.yOri = (state.yOri << 19) >> 19;
    state.yOri *= (2 * Math.PI) / 4095.0;

    state.zOri = ((data.getUint8(5) & 0xff) << 5) | ((data.getUint8(6) & 0xf8) >> 3);
    state.zOri = (state.zOri << 19) >> 19;
    state.zOri *= (2 * Math.PI) / 4095.0;

    state.xAcc = ((data.getUint8(6) & 0x07) << 10)
      | ((data.getUint8(7) & 0xff) << 2)
      | ((data.getUint8(8) & 0xc0) >> 6);
    state.xAcc = (state.xAcc << 19) >> 19;
    state.xAcc *= (8 * 9.8) / 4095.0;

    state.yAcc = ((data.getUint8(8) & 0x3f) << 7) | ((data.getUint8(9) & 0xfe) >>> 1);
    state.yAcc = (state.yAcc << 19) >> 19;
    state.yAcc *= (8 * 9.8) / 4095.0;

    state.zAcc = ((data.getUint8(9) & 0x01) << 12)
      | ((data.getUint8(10) & 0xff) << 4)
      | ((data.getUint8(11) & 0xf0) >> 4);
    state.zAcc = (state.zAcc << 19) >> 19;
    state.zAcc *= (8 * 9.8) / 4095.0;

    state.xGyro = ((data.getUint8(11) & 0x0f) << 9)
      | ((data.getUint8(12) & 0xff) << 1)
      | ((data.getUint8(13) & 0x80) >> 7);
    state.xGyro = (state.xGyro << 19) >> 19;
    state.xGyro *= ((2048 / 180) * Math.PI) / 4095.0;

    state.yGyro = ((data.getUint8(13) & 0x7f) << 6) | ((data.getUint8(14) & 0xfc) >> 2);
    state.yGyro = (state.yGyro << 19) >> 19;
    state.yGyro *= ((2048 / 180) * Math.PI) / 4095.0;

    state.zGyro = ((data.getUint8(14) & 0x03) << 11)
      | ((data.getUint8(15) & 0xff) << 3)
      | ((data.getUint8(16) & 0xe0) >> 5);
    state.zGyro = (state.zGyro << 19) >> 19;
    state.zGyro *= ((2048 / 180) * Math.PI) / 4095.0;

    state.xTouch = (((data.getUint8(16) & 0x1f) << 3) | ((data.getUint8(17) & 0xe0) >> 5))
      / 255.0;
    state.yTouch = (((data.getUint8(17) & 0x1f) << 3) | ((data.getUint8(18) & 0xe0) >> 5))
      / 255.0;

    onStateChangeCallback(state);
  }

  function onStateChangeCallback() {}

  //

  return {
    connect,
    onStateChange(callback) {
      onStateChangeCallback = callback;
    },
  };
}

const Daydream = ({ onClick }) => {
  const controller = React.useRef(null);

  const [isClickDown, setClickDown] = React.useState(false);

  React.useEffect(() => {
    controller.current = new DaydreamController({ onClick });

    let wasClickDown = false;
    controller.current.onStateChange(state => {
      setClickDown(state.isClickDown);

      if (wasClickDown && state.isClickDown === false) {
        wasClickDown = false;
      }

      if (state.isClickDown) {
        wasClickDown = true;
      }
    });
  });
  return (
    <div>
      <button onClick={() => controller.current.connect()} type="button">
        Connect to Daydream Controller
      </button>
      <div
        css={`
          width: 10px;
          height: 10px;
          background: ${isClickDown ? 'green' : 'red'};
        `}
      />
    </div>
  );
};

export default Daydream;
