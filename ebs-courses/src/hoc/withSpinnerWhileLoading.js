import { branch, renderComponent } from 'recompose';

import { Spinner } from '../components';

export const withSpinnerWhileLoading = isLoading =>
  branch(isLoading, renderComponent(Spinner));
