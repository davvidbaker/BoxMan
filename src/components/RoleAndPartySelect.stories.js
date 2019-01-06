import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RoleAndPartySelect from './RoleAndPartySelect';

storiesOf('RoleAndPartySelect', module).add('default', () => (
  <RoleAndPartySelect
    toggleFX={action('toggleFX')}
    selectRole={action('selectRole')}
    changePhase={action('changePhase')}
    changePartyName={action('changePartyName')}
  />
));
