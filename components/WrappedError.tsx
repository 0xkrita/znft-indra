import { CombinedError } from 'urql';

const WrappedError = (
  { error }: { error: CombinedError } = {
    error: {
      message: 'unknown error',
      name: '',
      graphQLErrors: [],
    },
  }
) => <p>Oh no... {error.message}</p>;

export default WrappedError;
