import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Party from './Party';

storiesOf('Party', module)
  .add(
    'default',
    props => console.log('🔥  props', props) || (
      <Party
        partyName="The Matrix"
        remoteStreams={[{ id: 'remoteStream1' }, { id: 'remoteStream2' }]}
        yourself={{ username: 'yusef', role: 'boxman' }}
        peers={[
          { username: 'david', role: 'boxman' },
          { username: 'john', role: 'boxman' },
          { username: 'mike', role: 'cameraguy' },
        ]}
      />
    ),
  )
  .add('empty', () => <Party partyName="The Matrix" remoteStreams={[]} />);
