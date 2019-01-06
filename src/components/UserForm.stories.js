import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import UserForm from './UserForm';

storiesOf('UserForm', module).add('default', () => (
  <UserForm submitUserForm={action('submitUserForm')} />
));
