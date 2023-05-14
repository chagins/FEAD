import compose from 'compose-function';
import { withRouter } from './withRouter';
import { withStore } from './withStore';
import { withTheme } from './withTheme';

export const withProviders = compose(withRouter, withStore, withTheme);
