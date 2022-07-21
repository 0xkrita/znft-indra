import { CombinedError } from 'urql';

export const WrappedError = (
  { error }: { error: CombinedError } = {
    error: {
      message: 'unknown error',
      name: '',
      graphQLErrors: [],
    },
  }
) => <p>Oh no... {error.message}</p>;
