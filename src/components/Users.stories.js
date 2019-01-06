import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Users from './Users';

storiesOf('Users', module).add('default', () => <Users />);
