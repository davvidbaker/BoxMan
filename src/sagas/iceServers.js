import { put } from 'redux-saga/effects';

import XIRSYS_SECRET from '../xirsys.secret';
import { RTC_ICE_SERVERS_GOT } from '../actions';
function* getIceServers() {
  console.log('gettings Ice Servers/connecting to XirSys...');

  // TODO this isn't actually secure, but 🤷 it is a free stun and turn server, and is the best I can to without a backend
  const iceServers = yield fetch(
    'https://global.xirsys.net/_turn/FourthPerson/',
    {
      method: 'PUT',
      headers: new Headers({ Authorization: `Basic ${btoa(XIRSYS_SECRET)}` }),
    }
  )
    .then(response => {
      console.log('response', response);
      return response.json();
    })
    .then(data => {
      if (data.s === 'ok') {
        // data.v is where the ICE servers object lives
        return data.v;
      } else {
        throw new Error(data.s);
      }
    })
    .catch(err => {
      console.error(err);
    });
  if (iceServers) {
    yield put({ type: RTC_ICE_SERVERS_GOT, iceServers: iceServers.iceServers });
  }
}

export default getIceServers;
