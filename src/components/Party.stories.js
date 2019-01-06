import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Party from './Party';

storiesOf('Party', module)
  .add(
    'default',
    props => console.log('🔥  props', props) || (
      <Party partyName="The Matrix" remoteStreams={['asf']} />
    ),
  )
  .add('empty', () => <Party partyName="The Matrix" remoteStreams={[]} />);
