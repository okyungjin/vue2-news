import { END_SPINNER } from '../utils/spinner';
import { bus } from '../utils/bus';

export const spinnerMixin = {
  mounted() {
    bus.$emit(END_SPINNER);
  },
};
